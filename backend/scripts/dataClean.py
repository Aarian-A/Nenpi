import pandas as pd
import numpy as np
import re

# Load data
# df = pd.read_csv('todd/todderStash.csv', header = 1)
#df = pd.concat(pd.read_csv('LOG_stash_293_cols.csv'))
#df = df.drop(df.index[0])

csv_files = ['../csv/21Smartway.csv', '../csv/22Smartway.csv', '../csv/23Smartway.csv', '../csv/24Smartway.csv', '../csv/25Smartway.csv']

for csv_file in csv_files:
    df = pd.read_csv(csv_file)
    
    # Replace empty strings with NaN
    df.replace("", np.nan, inplace=True)

    # Replace zeros with NaN
    df.replace(0, np.nan, inplace=True)

    cols_to_drop = ['Cert', 'Region', 'Stnd', 'Stnd Description', 'Underhood ID']

    # Only keep columns in cols_to_drop that actually exist in the DataFrame
    cols_to_drop = [col for col in cols_to_drop if col in df.columns]

    # Drop the columns
    df.drop(columns=cols_to_drop, inplace=True)

    # Save the cleaned DataFrame back to the same CSV file
    df.to_csv(csv_file, index=False)
    # Extract the first word from the 'Model' column to create the 'Make' column
    df['Make'] = df['Model'].apply(lambda x: x.split()[0] if isinstance(x, str) else np.nan)

    # Insert the 'Make' column to the left of the 'Model' column
    model_index = df.columns.get_loc('Model')
    df.insert(model_index, 'Make', df.pop('Make'))