
# -*- coding:utf-8 -*-
import json
def process_json(input_json_file, output_json_file):
    file_in = open(input_json_file, "r")
    file_out = open(output_json_file, "w")
    # load数据到变量json_data
    json_data = json.load(file_in)

    # 修改json中的数据
    locations = {}
    #for location in json_data["locations"]:
    for location in json_data:
        print(location)
        locations[location["uid"]] = location
    
    # 将修改后的数据写回文件
    file_out.write(json.dumps(locations))
    file_in.close()
    file_out.close()
 
process_json("./Recommand.json","./processedLocations.json")