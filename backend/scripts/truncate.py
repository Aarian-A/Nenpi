import csv
import pandas as pd
from collections import defaultdict
import os

def process_csv(filename):
    data = defaultdict(list)

    with open(filename, 'r') as f:
        reader = csv.reader(f)
        for row in reader:
            data[len(row)].append(row)

    # Create a new directory for the output files
    output_dir = 'output'
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Remove the .csv extension from the original filename
    base_filename = os.path.splitext(os.path.basename(filename))[0]

    for cols, rows in data.items():
        df = pd.DataFrame(rows)
        # Save the file in the new directory with the .csv extension removed
        df.to_csv(os.path.join(output_dir, f'{base_filename}_stash_{cols}_cols.csv'), index=False)

# Call the function with the filename
process_csv(input("Enter filename or file path: "))
