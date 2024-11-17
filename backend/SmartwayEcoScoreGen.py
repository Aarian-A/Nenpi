import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

# Load and process the CSVs
def process_csv(file_path):
    df = pd.read_csv(file_path)

    # Clean the 'Cmb MPG' column
    df['Cmb MPG'] = df['Cmb MPG'].apply(lambda x: int(str(x).split('/')[0]) if isinstance(x, str) and '/' in x else int(x))
    
    # Compute the 'Eco Score'
    df['Eco Score'] = (df['Cmb MPG'] * df['Greenhouse Gas Score'] / df['Air Pollution Score']).fillna(0)
    
    return df

# List of CSV file paths
csv_files = ["csv/21Smartway.csv", "csv/22Smartway.csv", "csv/23Smartway.csv", "csv/24Smartway.csv", "csv/25Smartway.csv"]

# Combine all data
dataframes = [process_csv(file) for file in csv_files]
combined_data = pd.concat(dataframes, ignore_index=True)

# Prepare features (X) and target (y)
X = combined_data[['Cmb MPG', 'Greenhouse Gas Score', 'Air Pollution Score', 'Model']]
y = combined_data['Eco Score']

# Store model names for printing
model_names = X['Model'].values
X = X.drop(columns=['Model'])

# Split data
X_train, X_test, y_train, y_test, models_train, models_test = train_test_split(X, y, model_names, test_size=0.2, random_state=42)

# Train the Random Forest model
model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)

# Predictions and evaluation
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse:.2f}")

# # Print some predictions with their corresponding model names
# for i in range(5):  # Print first 5 predictions
#     print(f"Vehicle Model: {models_test[i]}, Predicted Eco Score: {y_pred[i]:.2f}, Actual Eco Score: {y_test.iloc[i]:.2f}")
# print(combined_data.head())

def print_eco_scores(models, predictions, actuals, num=5):
    for i in range(min(num, len(models))):
        print(f"Vehicle Model: {models[i]}, Predicted Eco Score: {predictions[i]:.2f}, Actual Eco Score: {actuals.iloc[i]:.2f}")

# Call the method to print eco scores
print_eco_scores(models_test, y_pred, y_test)

# Save the eco scores back to the respective CSV files
for file in csv_files:
    df = process_csv(file)
    X = df[['Cmb MPG', 'Greenhouse Gas Score', 'Air Pollution Score']]
    y_pred = model.predict(X)
    df['Predicted Eco Score'] = y_pred
    df.to_csv(file, index=False)