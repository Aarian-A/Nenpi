const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const xlsx = require('xlsx'); // For Excel file reading
const axios = require('axios'); // Import axios for making API requests
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

// Load and preprocess the Excel file
let carData = []; // Array to store processed car data

const loadExcelData = () => {
    const filePath = './2025XL.xlsx'; // Path to your Excel file
    const workbook = xlsx.readFile(filePath); // Read the Excel file
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert to JSON
    carData = sheetData; // Save the data
};

loadExcelData(); // Call this at startup to load the data

// Search car function
const searchCarData = (make, model) => {
    const filteredCars = carData.filter((row) => {
        const matchesMake = make ? row['Division']?.toString().toLowerCase().includes(make.toLowerCase()) : true;
        const matchesModel = model ? row['Carline']?.toString().toLowerCase().includes(model.toLowerCase()) : true;
        return matchesMake && matchesModel;
    });

    const fuelEconomyData = filteredCars.map((row) => ({
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
        // Extract make and model from the user's query
        const prompt = `
            Extract only the "make" and "model" from the following user query:
            "${userMessage}"

            Respond in this JSON format:
            {
                "make": "<make>",
                "model": "<model>"
            }
            If the query does not specify both, include "unknown" for the missing field.
        `;

        const response = await axios.post(
            'https://api.sambanova.ai/v1/chat/completions',
            {
                model: 'Meta-Llama-3.1-8B-Instruct',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant for extracting car makes and models.' },
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

        const { make, model } = JSON.parse(response.data.choices[0].message.content);

        if (!make || !model) {
            return res.status(400).send({ error: 'Could not extract make or model from user query.' });
        }

        // Search for car data
        const searchResults = searchCarData(make, model);

        if (searchResults.length === 0) {
            return res.status(404).send({ error: 'No matching cars found in the dataset.' });
        }

        // Get car image
        const carImage = await getCarImage(make, model);

        if (!carImage) {
            return res.status(404).send({ 
                make, 
                model, 
                results: searchResults, 
                message: 'No image found for the specified car.' 
            });
        }

        // Send the search results and car image back to the client
        res.send({ make, model, results: searchResults, image: carImage });
    } catch (error) {
        console.error('Error processing the chat request:', error.message);
        res.status(500).send({ error: 'Failed to process your request', details: error.message });
    }
});


const carsxe_api_key = '97i1j1qxm_f5r21dnhf_kx7jqivrw';

// Function to fetch car image using CarsXE API
const getCarImage = async (make, model) => {
    try {
        const response = await axios.get('https://api.carsxe.com/images', {
            params: {
                key: carsxe_api_key,
                make: make,
                model: model,
                year: 2022, // Fixed year
            },
        });

        if (response.data && response.data.images && response.data.images.length > 0) {
            return response.data.images[0]; // Return the first image URL
        } else {
            return null; // No image found
        }
    } catch (error) {
        console.error('Error fetching car image from CarsXE API:', error.message);
        return null; // Return null if the API call fails
    }
};


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
