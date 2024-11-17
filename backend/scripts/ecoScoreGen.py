import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

# Load and process the CSVs
def process_csv(file_path):
    df = pd.read_csv(file_path)

    # Clean the 'Cmb MPG' column
    df['Comb Unrd Adj FE - Conventional Fuel'] = df['Comb Unrd Adj FE - Conventional Fuel'].apply(lambda x: int(str(x).split('/')[0]) if isinstance(x, str) and '/' in x else int(x))
    
    # Compute the 'Eco Score'
    df['Eco Score'] = (df['Comb Unrd Adj FE - Conventional Fuel'] * df['GHG Rating (1-10 rating on Label)'] / df['#1 Mfr Smog Rating (Mfr Smog 1-10 Rating on Label for Test Group 1)'] * df["Comb CO2 Rounded Adjusted (as shown on FE Label)"]).fillna(0)
    
    return df

# List of CSV file paths
csv_files = ["csv/FE/2021 FE.csv", "csv/FE/2022 FE.csv", "csv/FE/2023 FE.csv", "csv/FE/2024 FE.csv", "csv/FE/2025 FE.csv"]

# Combine all data
dataframes = [process_csv(file) for file in csv_files]
combined_data = pd.concat(dataframes, ignore_index=True)

# Prepare features (X) and target (y)
X = combined_data[['Comb Unrd Adj FE - Conventional Fuel', 'GHG Rating (1-10 rating on Label)', '#1 Mfr Smog Rating (Mfr Smog 1-10 Rating on Label for Test Group 1)', 'Comb CO2 Rounded Adjusted (as shown on FE Label)']]
y = combined_data['Eco Score']

# Store model names for printing
model_names = combined_data[['Division', 'Carline']].values
combined_data['Model_Full'] = combined_data['Division'] + " " + combined_data['Carline']

# Split data
X_train, X_test, y_train, y_test, models_train, models_test = train_test_split(X, y, model_names, test_size=0.2, random_state=42)

# Train the Random Forest model
model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)

# Predictions and evaluation
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse:.2f}")

# Function to return predicted eco score for a specific year, make, and model
def get_eco_score(year, make, model):
    # Filter the dataset for the matching vehicle
    csv_file = f"csv/FE/{year} FE.csv"
    
    try:
        # Load and process the specific CSV file for the given year
        df = process_csv(csv_file)
        
        # Combine make and model to match against 'Model_Full'
        model_full = f"{make} {model}"
        vehicle_data = df[df['Model_Full'].str.contains(model_full, case=False, na=False)]
        
        if vehicle_data.empty:
            return f"No vehicle found for {year} {make} {model}."
        
        # Prepare the features for prediction
        X_single = vehicle_data[['Comb Unrd Adj FE - Conventional Fuel', 'GHG Rating (1-10 rating on Label)', '#1 Mfr Smog Rating (Mfr Smog 1-10 Rating on Label for Test Group 1)', 'Comb CO2 Rounded Adjusted (as shown on FE Label)']]
        
        # Predict Eco Score for the specific vehicle
        eco_score = model.predict(X_single)
        
        # Return the predicted Eco Score
        return f"Predicted Eco Score for {year} {make} {model}: {eco_score[0]:.2f}"
    
    except FileNotFoundError:
        return f"No data available for the year {year}."

# Example usage
year = 2023
make = "Toyota"
model = "Camry"
print(get_eco_score(year, make, model))