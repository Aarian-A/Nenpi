const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const xlsx = require('xlsx'); // For Excel file reading
const axios = require('axios'); // Import axios for making API requests
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ensure 'uploads' directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Configure multer for file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads');
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.xlsx') {
            return cb(new Error('Only .xlsx files are allowed!'));
        }
        cb(null, true);
    }
});

// Global car data
let carData = [];

// Load and preprocess the Excel file
const loadExcelData = (filePath) => {
    const workbook = xlsx.readFile(filePath); // Read the Excel file
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert to JSON
    carData = sheetData; // Save the data
};

// Load default file at startup
const defaultFilePath = './2025XL.xlsx';
if (fs.existsSync(defaultFilePath)) {
    loadExcelData(defaultFilePath);
    console.log('Default Excel file loaded.');
} else {
    console.log('Default Excel file not found. Please upload a file.');
}

// Upload endpoint to upload new Excel files
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ error: 'No file uploaded.' });
        }

        const filePath = req.file.path;
        loadExcelData(filePath);

        res.status(200).send({ message: 'File uploaded and processed successfully.', data: carData });
    } catch (error) {
        console.error('Error processing the uploaded file:', error.message);
        res.status(500).send({ error: 'Failed to process the uploaded file.', details: error.message });
    }
});

// Search car function
const searchCarData = (year, make, model) => {
    const filteredCars = carData.filter((row) => {
        const matchesYear = year ? row['Model Year']?.toString() === year.toString() : true;
        const matchesMake = make ? row['Division']?.toString().toLowerCase().includes(make.toLowerCase()) : true;
        const matchesModel = model ? row['Carline']?.toString().toLowerCase().includes(model.toLowerCase()) : true;
        return matchesYear && matchesMake && matchesModel;
    });

    const fuelEconomyData = filteredCars.map((row) => ({
        year: row['Model Year'],
        make: row['Division'],
        model: row['Carline'],
        cityFuelEconomy: row['City FE (Guide) - Conventional Fuel'],
        highwayFuelEconomy: row['Hwy FE (Guide) - Conventional Fuel'],
        combinedFuelEconomy: row['Comb FE (Guide) - Conventional Fuel']
    }));

    return fuelEconomyData;
};

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    const { userMessage } = req.body;

    if (!userMessage) {
        return res.status(400).send({ error: 'userMessage is required' });
    }

    try {
        // Define the prompt
        const prompt = `
            Extract the "year", "make", and "model" from the following user query:
            "${userMessage}"

            Respond in this JSON format:
            {
                "year": "<year>",
                "make": "<make>",
                "model": "<model>"
            }
            If the query does not specify any of these, include "unknown" for the missing field.
        `;

        // Send the prompt to Sambanova API
        const response = await axios.post(
            'https://api.sambanova.ai/v1/chat/completions',
            {
                model: 'Meta-Llama-3.1-8B-Instruct',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant for extracting car year, makes, and models.' },
                    { role: 'user', content: prompt },
                ],
                temperature: 0.1,
                top_p: 0.1,
            },
            {
                headers: {
                    Authorization: `Bearer ${"cb71050e-2e63-46e5-a6b6-45cdb77b8dae"}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Parse the assistant's response
        const { year, make, model } = JSON.parse(response.data.choices[0].message.content);

        if (!year || !make || !model) {
            return res.status(400).send({ error: 'Could not extract year, make, or model from user query.' });
        }

        // Search for car data using year, make, and model
        const searchResults = searchCarData(year, make, model);

        if (searchResults.length === 0) {
            return res.status(404).send({ error: 'No matching cars found in the dataset.' });
        }

        // Fetch car image using year, make, and model
        const carImage = await getCarImage(make, model, year);

        if (!carImage) {
            return res.status(404).send({ 
                year, 
                make, 
                model, 
                results: searchResults, 
                message: 'No image found for the specified car.' 
            });
        }

        // Send the search results and car image back to the client
        res.send({ year, make, model, results: searchResults, image: carImage });
    } catch (error) {
        console.error('Error processing the chat request:', error.message);
        res.status(500).send({ error: 'Failed to process your request', details: error.message });
    }
});

// CarsXE API key
const carsxe_api_key = '97i1j1qxm_f5r21dnhf_kx7jqivrw';

// Function to fetch car image using CarsXE API
const getCarImage = async (make, model, year) => {
    try {
        const response = await axios.get('https://api.carsxe.com/images', {
            params: {
                key: carsxe_api_key,
                make: make,
                model: model,
                year: year,
            },
        });

        if (response.data && response.data.images && response.data.images.length > 0) {
            return response.data.images[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching car image from CarsXE API:', error.message);
        return null;
    }
};

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
