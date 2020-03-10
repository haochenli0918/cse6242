import json

import csv

# You can get the crime data in the https://www.atlantapd.org/services/central-records-unit website
with open('crime.csv', mode='r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    line_count = 0
    content = list((round(float(rows["Latitude"]), 2),round(float(rows["Longitude"]), 2)) for rows in csv_reader)
    set = set([x for x in content if content.count(x) > 1])
    query = []
    max = 0
    for x in content:
        if max < content.count(x):
            max = content.count(x)
    print(max)
    query = dict((x, (max - content.count(x)) / max * 100) for x in set)


with open("Atlanta_rent_yelp_added.json",'r') as f:
    temp = json.loads(f.read())
    for i in range(0, len(temp)):
        latitude = round(float(temp[i]['latitude']), 2)
        longitude = round(float(temp[i]['longitude']), 2)
        if (latitude, longitude) in query:
            temp[i]['crime_rating'] = query[(latitude, longitude)]
        else:
            temp[i]['crime_rating'] = 100
with open('Atlanta_rent_ratings_added.json','w') as outfile:
    json.dump(temp, outfile)


