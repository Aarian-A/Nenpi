import csv

def print_unique_first_words_of_model(csv_file, output_file):
    unique_first_words = set()
    
    with open(csv_file, 'r') as file:
        reader = csv.reader(file)
        header = next(reader)  # Skip the header row
        model_index = header.index("Model")  # Find the index of the "Model" column
        for row in reader:
            if row:  # Ensure the row is not empty
                first_word = row[model_index].split(' ')[0]
                unique_first_words.add(first_word)
    
    with open(output_file, 'w') as file:
        for word in unique_first_words:
            file.write(word + '\n')

# Usage example
csv_file = 'LOG_stash_293_cols.csv'
output_file = 'LOGModelFirstWords.txt'
print_unique_first_words_of_model(csv_file, output_file)
