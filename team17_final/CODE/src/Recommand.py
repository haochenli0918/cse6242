from sklearn.neighbors import NearestNeighbors
import numpy as np
import pandas as pd
import json
import csv

with open("Atlanta_rent.json", 'r') as f:
    temp = json.loads(f.read())
    print(temp)

data = temp
zipcodelist =[30030, 30303, 30306, 30307, 30308, 30309, 30310, 30311, 30312, 30313, 30314, 30315, 30316, 30324, 30317, 30318, 30329, 30344, 30354, 30363]
#zipcodelist = [30318]
csv_write = open("Recommand.csv","w")
writer = csv.writer(csv_write)
'''
X = np.array([[-1, -1], [-2, -1], [-3, -2], [1, 1], [2, 1], [3, 2]])
nbrs = NearestNeighbors(n_neighbors=4, algorithm='ball_tree').fit(X)
distances, indices = nbrs.kneighbors(X)
print(indices)
'''
fileheader = ['uid', 'name', 'Sqft', 'bedrooms', 'bathrooms', 'price', 'address', 'url', 'latitude', 'longitude',
              'zipcode', 'recommand_1', 'recommand_2', "recommand_3"]
writer.writerow(fileheader)
for zipcode in zipcodelist:
    X = []
    original_content = []
    for line in data:
        if (line["zipcode"] == zipcode and line["bedrooms"] != None and line["bathrooms"] != None):
            try:
                X.append([float(line["Sqft"]), float(line["bedrooms"]), float(line["bathrooms"]), float(line["price"])])
                original_content.append([line["uid"], line["name"], line["Sqft"], line["bedrooms"], line["bathrooms"], line["price"], line["address"], line["url"], line["latitude"], line["longitude"], line["zipcode"]])
            except:
                pass
    length_1 = len(X)
    length_2 = len(original_content)
    #print(length_1, length_2)
    #print(original_content)
    matrix = np.array(X)
    length_col = len(matrix[0])
    length_row = len(matrix)
    #print(length_col, length_row)
    min = matrix.min(axis=0)
    max = matrix.max(axis=0)
    #print(min, max)
    for col in range(0, length_col):
        for row in range(0, length_row):
            matrix[row][col] = (matrix[row][col]-min[col])/(max[col]-min[col])
    #print(matrix)
    nbrs = NearestNeighbors(n_neighbors=4, algorithm='ball_tree').fit(matrix)
    distances, indices = nbrs.kneighbors(matrix)
    #print(indices)
    #print(matrix)


    for i in range(0, length_2):
        line = original_content[i]
        print(i)
        recommand_1 = indices[i][1]
        recommand_2 = indices[i][2]
        recommand_3 = indices[i][3]
        print(recommand_1, recommand_2, recommand_3)
        line.append(original_content[recommand_1][0])
        line.append(original_content[recommand_2][0])
        line.append(original_content[recommand_3][0])
        print(line)
        writer.writerow(line)



csv_write.close()


