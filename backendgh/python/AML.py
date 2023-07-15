import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import MiniBatchKMeans
from sklearn.metrics import precision_score, recall_score, f1_score
from sklearn.dummy import DummyClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from pymongo import MongoClient
# import bson

host = 'localhost'  # MongoDB host
port = 27017  # MongoDB port
database_name = 'local'  # Name of your database
collection_name = 'graph_datas'  # Name of your collection

# general_data = pd.read_excel('General Data Set.xlsx')

# education_data = pd.read_excel('Education Data Set.xlsx')
client = MongoClient('mongodb://localhost:27017')

db= client ['local']
collection = db['gds']

cursor = collection.find()
data = list(cursor)

df = pd.DataFrame(data)
df.to_csv('data.csv', index=False)

df = pd.read_csv('data.csv')
df.to_excel('General Data Set.xlsx', index=False)
general_data = pd.read_excel('General Data Set.xlsx')
db= client ['local']
collection = db['eds']

cursor = collection.find()
data = list(cursor)

df = pd.DataFrame(data)
df.to_csv('data.csv', index=False)

df = pd.read_csv('data.csv')
df.to_excel('Education Data Set.xlsx', index=False)
education_data = pd.read_excel('Education Data Set.xlsx')
# Exploring the datasets
general_data.head()

education_data.head()

general_data.isna().sum()

education_data.isna().sum()

general_data.describe()

education_data.describe()

# Merge the datasets based on the 'Division' column
merged_data = pd.merge(general_data, education_data, on='Division', suffixes=('_general', '_education'))

# Select relevant columns for analysis
selected_columns = ['Division', 'Male', 'Female', 'Others', 'Age_general', 'Avg Annual Growth', 'Avg HouseHold Size',
                    'Below Primary', 'PRIMARY', 'MIDDLE', 'MATRIC', 'INTERMEDIATE', 'GRADUATE',
                    'MASTERS & ABOVE', 'DIPLOMA/ CERTIFICATE', 'literacy %']

print(merged_data.columns)

# Filter the merged dataset to include only the selected columns
filtered_data = merged_data[selected_columns]

# Handle missing values, if any
filtered_data = filtered_data.dropna()

# Convert 'Age_general' column to numeric values
def convert_age(x):
    try:
        return int(x.split('-')[0].split(' ')[-1])
    except (ValueError, AttributeError):
        print(f"Unable to convert value: {x}")
        return 0

filtered_data['Age_general'] = filtered_data['Age_general'].apply(convert_age)

# Drop rows with missing values in the 'Age_general' column
filtered_data = filtered_data.dropna(subset=['Age_general'])

for column in filtered_data.columns:
    # Check if the column is not the one to ignore
    if column != 'Division':
        # Check if the column contains string values
        if filtered_data[column].dtype == 'object':
            # Remove non-numeric characters from the column
            filtered_data[column] = filtered_data[column].str.replace(',', '')
            # Convert the column to float
            filtered_data[column] = filtered_data[column].astype(float)

# Perform feature scaling
scaler = StandardScaler()
scaled_data = scaler.fit_transform(filtered_data.iloc[:, 1:])

# Apply dimensionality reduction using PCA
pca = PCA(n_components=2)
reduced_data = pca.fit_transform(scaled_data)

# Assuming the ground truth labels are in the 'Label' column
ground_truth_labels = filtered_data['Age_general']

# Split the data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(reduced_data, ground_truth_labels, test_size=0.2, random_state=0)

# Create a dummy classifier for demonstration
dummy_model = DummyClassifier(strategy='uniform', random_state=0)

# Train the dummy model
dummy_model.fit(X_train, y_train)

# Predict on the training and testing data
train_predictions = dummy_model.predict(X_train)
test_predictions = dummy_model.predict(X_test)

# Calculate train and test accuracy
train_accuracy = accuracy_score(y_train, train_predictions)
test_accuracy = accuracy_score(y_test, test_predictions)

print("Train Accuracy:", train_accuracy)
print("Test Accuracy:", test_accuracy)

# Create a line plot to visualize the accuracy
plt.plot([train_accuracy, test_accuracy], marker='o')
plt.xticks([0, 1], ['Training Accuracy', 'Testing Accuracy'])
plt.ylim(0, 1)
plt.title('Accuracy of Dummy Model')

plot_file='Accuracy_of_Dummy_Model.png'
plt.savefig(plot_file)

# Connection information
with open(plot_file, 'rb') as f:
    plot_data = f.read()

# Create a MongoDB client
client = MongoClient(host, port)

# Access your database
database = client[database_name]

# Access a specific collection within the database
collection = database[collection_name]

# Create a document to store the plot data

document = {
    'title': 'Accuracy_of_Dummy_Model',
    'plot': plot_data
}

# Insert the document into the collection
collection.insert_one(document)

# Close the MongoDB connection
client.close()

# Perform predictions using the dummy model
predicted_labels = dummy_model.fit(reduced_data, ground_truth_labels).predict(reduced_data)

precision = precision_score(ground_truth_labels, predicted_labels, average='macro')
recall = recall_score(ground_truth_labels, predicted_labels, average='macro')
f1 = f1_score(ground_truth_labels, predicted_labels, average='macro')

print("Precision:", precision) 
print("Recall:", recall)
print("F1-Score:", f1)    # output

client = MongoClient(host, port)
database = client['local']
collection = database['outputs']
document_output = {
    'Precision:': precision,
    'Recall:': recall,
    'F1-Score:': f1
}
collection.insert_one(document_output)

client.close()

# EDA and Visualization
# Correlation Heatmap
filtered_data1 = filtered_data.drop('Division', axis=1)
# Calculate the correlation matrix
corr = filtered_data1.corr()
plt.figure(figsize=(12, 8))
sns.heatmap(corr, annot=True, cmap='coolwarm', fmt=".2f", linewidths=0.5)
plt.title('Correlation Heatmap')

# Distribution of Age_general
plt.figure(figsize=(8, 6))
sns.histplot(data=filtered_data, x='Age_general', kde=True, bins=10)
plt.title('Distribution of Age')
plt.xlabel('Age')
plt.ylabel('Count')

plot_file1='Distribution_of_Age.png'
plt.savefig(plot_file1)
with open(plot_file1, 'rb') as f:
    plot_data1 = f.read()

# Create a MongoDB client
client = MongoClient(host, port)

# Access your database
database = client[database_name]

# Access a specific collection within the database
collection = database[collection_name]

# Create a document to store the plot data

document1 = {
    'title': 'Distribution_of_Age',
    'plot': plot_data1
}

# Insert the document into the collection
collection.insert_one(document1)

# Close the MongoDB connection
client.close()


plt.figure(figsize=(12, 8))
sns.countplot(data=filtered_data, x='Division')
plt.title('Count of Divisions')
plt.xlabel('Division')
plt.ylabel('Count')
plt.xticks(rotation=90)


plt.figure(figsize=(8, 6))
sns.boxplot(data=filtered_data, y='Avg Annual Growth')
plt.title('Distribution of Avg Annual Growth')
plt.ylabel('Avg Annual Growth')

plot_file2='Distribution_of_Avg_Annual_Growth.png'
plt.savefig(plot_file2)

# Connection information
with open(plot_file2, 'rb') as f:
    plot_data2 = f.read()

# Create a MongoDB client
client = MongoClient(host, port)

# Access your database
database = client[database_name]

# Access a specific collection within the database
collection = database[collection_name]

# Create a document to store the plot data

document2 = {
    'title': 'Distribution_of_Avg_Annual_Growth',
    'plot': plot_data2
}

# Insert the document into the collection
collection.insert_one(document2)

# Close the MongoDB connection
client.close()

sns.pairplot(filtered_data[['Avg HouseHold Size', 'Below Primary', 'PRIMARY', 'MIDDLE', 'MATRIC', 'INTERMEDIATE',
                            'GRADUATE', 'MASTERS & ABOVE', 'DIPLOMA/ CERTIFICATE', 'literacy %']],
             palette='viridis')
plt.title('Pairwise Scatter Plots')

plot_file3 ='Pairwise Scatter Plots.png'
plt.savefig(plot_file3)

# Connection information
with open(plot_file3, 'rb') as f:
    plot_data3 = f.read()

# Create a MongoDB client
client = MongoClient(host, port)

# Access your database
database = client[database_name]

# Access a specific collection within the database
collection = database[collection_name]

# Create a document to store the plot data

document3 = {
    'title': 'Pairwise Scatter Plots',
    'plot': plot_data3
}

# Insert the document into the collection
collection.insert_one(document3)

# Close the MongoDB connection
client.close()


numeric_columns = ['Avg HouseHold Size', 'Below Primary', 'PRIMARY', 'MIDDLE', 'MATRIC', 'INTERMEDIATE', 'GRADUATE',
                   'MASTERS & ABOVE', 'DIPLOMA/ CERTIFICATE', 'literacy %']
mean_values = filtered_data[numeric_columns].mean()

plt.figure(figsize=(12, 8))
sns.barplot(x=mean_values.index, y=mean_values.values)
plt.title('Average Values of Numerical Variables')
plt.xlabel('Variable')
plt.ylabel('Average Value')
plt.xticks(rotation=90)

plot_file4='Average Values of Numerical Variables.png'
plt.savefig(plot_file4)

# Connection information
with open(plot_file4, 'rb') as f:
    plot_data4 = f.read()

# Create a MongoDB client
client = MongoClient(host, port)

# Access your database
database = client[database_name]

# Access a specific collection within the database
collection = database[collection_name]

# Create a document to store the plot data

document4 = {
    'title': 'Average Values of Numerical Variables',
    'plot': plot_data4
}

# Insert the document into the collection
collection.insert_one(document4)

# Close the MongoDB connection
client.close()

plt.figure(figsize=(12, 8)) #output
for column in numeric_columns:
    sns.barplot(x='Division', y=column, data=filtered_data, ci=None)
plt.title('Average Values of Numerical Variables by Division')
plt.xlabel('Division')
plt.ylabel('Average Value')
plt.xticks(rotation=90)
plt.legend(numeric_columns)


plot_file5='Average_Values_of_Numerical_Variables_by_Division.png'
plt.savefig(plot_file5)

# Connection information
with open(plot_file5, 'rb') as f:
    plot_data5 = f.read()

# Create a MongoDB client
client = MongoClient(host, port)

# Access your database
database = client[database_name]

# Access a specific collection within the database
collection = database[collection_name]

# Create a document to store the plot data

document5 = {
    'title': 'Average_Values_of_Numerical_Variables_by_Division',
    'plot': plot_data5
}

# Insert the document into the collection
collection.insert_one(document5)

# Close the MongoDB connection
client.close()

plt.figure(figsize=(8, 6))
sns.scatterplot(data=filtered_data, x='Avg HouseHold Size', y='literacy %')
plt.title('Scatter Plot: Avg HouseHold Size vs. Literacy %')
plt.xlabel('Avg HouseHold Size')
plt.ylabel('Literacy %')


plt.figure(figsize=(12, 8))
for column in numeric_columns:
    sns.boxplot(x='Division', y=column, data=filtered_data)
plt.title('Distribution of Numerical Variables by Division')
plt.xlabel('Division')
plt.ylabel('Value')
plt.xticks(rotation=90)


plt.figure(figsize=(10, 6))
sns.countplot(x='Division', hue='Male', data=filtered_data)
plt.title('Count of Males and Females by Division')
plt.xlabel('Division')
plt.ylabel('Count')
plt.xticks(rotation=90)
plt.legend(['Female', 'Male'])


sns.pairplot(filtered_data[numeric_columns])
plt.title('Pairwise Relationships between Numerical Variables')


plt.figure(figsize=(10, 6))
sns.barplot(x='Division', y='Avg Annual Growth', data=filtered_data)
plt.title('Average Annual Growth by Division')
plt.xlabel('Division')
plt.ylabel('Avg Annual Growth')
plt.xticks(rotation=90)

plot_file6='Average Annual Growth by Division.png'
plt.savefig(plot_file6)

# Connection information
with open(plot_file6, 'rb') as f:
    plot_data6 = f.read()

# Create a MongoDB client
client = MongoClient(host, port)

# Access your database
database = client[database_name]

# Access a specific collection within the database
collection = database[collection_name]

# Create a document to store the plot data

document6 = {
    'title': 'Average Annual Growth by Division',
    'plot': plot_data6
}

# Insert the document into the collection
collection.insert_one(document6)

# Close the MongoDB connection
client.close()
