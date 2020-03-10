import argparse
import json
import requests
import sys
import urllib

def main():
    output = {}
    
    with open('Atlanta_rent.json') as input_file:
        input = json.load(input_file)

        with open("data.json") as rating_file:
            rating = json.load(rating_file)
            max_num_key = max(rating, key = lambda k : rating[k])
            max_num = rating[max_num_key]
            
            for d_new in input:
                d_new["yelp_rating"] = rating[d_new["uid"]] / max_num * 100;
            
    with open('convenience_rating.json', 'w') as final_output_file:
        json.dump(input, final_output_file)
        
if __name__ == '__main__':
    main()
