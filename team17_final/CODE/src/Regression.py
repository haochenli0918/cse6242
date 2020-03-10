import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import json
import csv
from sklearn import datasets, linear_model
from sklearn.linear_model import LinearRegression
from mpl_toolkits.mplot3d import Axes3D
from matplotlib import cm
with open("Atlanta_rent.json", 'r') as f:
    temp = json.loads(f.read())
    print(temp)
#    print(temp['rule'])
#   print(temp['rule']['namespace'])
'''
data = temp
zipcodelist =[30030, 30303, 30306, 30307, 30308, 30309, 30310, 30311, 30312, 30313, 30314, 30315, 30316, 30324, 30317, 30318, 30329, 30344, 30354, 30363]
csv_write = open("Predict.csv","w")
writer = csv.writer(csv_write)
fileheader = ["zipcode", 'co_sqft', 'co_bedrooms', 'co_bathrooms']
writer.writerow(fileheader)
for zipcode in zipcodelist:
    X = []
    Y = []
    for line in data:
        if(line["zipcode"] == zipcode and line["Sqft"]!=None and line["bedrooms"]!=None and line["bathrooms"]!=None):
            try:
                X.append([float(line["Sqft"]),float(line["bedrooms"]), float(line["bathrooms"])])
                Y.append(float(line["price"]))
            except:
                pass
    linreg = LinearRegression()
    linreg.fit(X, Y)
    print("the zipcode is", zipcode, linreg.intercept_, linreg.coef_)
    result = [zipcode, linreg.coef_[0], linreg.coef_[1], linreg.coef_[2]]
    writer.writerow(result)
csv_write.close()

'''


data = temp
#zipcodelist =[30030, 30303, 30306, 30307, 30308, 30309, 30310, 30311, 30312, 30313, 30314, 30315, 30316, 30324, 30317, 30318, 30329, 30344, 30354, 30363]
zipcodelist = [30308, 30309, 30311, 30318]
csv_write = open("Predict.csv","w")
writer = csv.writer(csv_write)
fileheader = ["zipcode", 'co_bedrooms', 'co_bathrooms']
writer.writerow(fileheader)
for zipcode in zipcodelist:
    X = []
    Y = []
    for line in data:
        if(line["zipcode"] == zipcode and line["bedrooms"]!=None and line["bathrooms"]!=None):
            try:
                X.append([float(line["bedrooms"]), float(line["bathrooms"])])
                Y.append(float(line["price"]))
            except:
                pass
    linreg = LinearRegression()
    linreg.fit(X, Y)
    print("the zipcode is", zipcode, linreg.intercept_, linreg.coef_)
    result = [zipcode, linreg.coef_[0], linreg.coef_[1]]
    #writer.writerow(result)
    fig = plt.figure()
    ax = Axes3D(fig)

    x_data = np.array([x[0] for x in X])
    y_data = np.array([x[1] for x in X])
    z_data = np.array([y for y in Y])
    ax.scatter(x_data, y_data, z_data, c = z_data, cmap='hot')

    x_pre = np.arange(0, max(x_data), 0.025)
    y_pre = np.arange(0, max(y_data), 0.025)
    x_pre, y_pre = np.meshgrid(x_pre, y_pre)
    r = linreg.coef_[0]*x_pre+linreg.coef_[1]*y_pre

    ax.plot_surface(x_pre, y_pre, r, rstride=1,
                    cstride=1,
                    cmap=plt.cm.hot)
    ax.contourf(x_pre, y_pre, r,
                zdir='z',
                offset=0,
                cmap=plt.cm.hot)
    '''
    surf = ax.plot_surface(x_pre, y_pre, r, cmap=cm.gray,
                           linewidth=0, antialiased=False)
    '''
    ax.set_title(str(zipcode), fontsize=12)
    ax.set_xlabel('Number of Bedrooms')
    ax.set_ylabel('Number of Bathrooms')
    ax.set_zlabel('Price ($)')

    plt.show()

csv_write.close()
