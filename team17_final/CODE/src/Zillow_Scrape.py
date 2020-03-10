import uuid

import requests
import logging
import json
import unicodecsv as csv
from lxml import html
import argparse
from bs4 import BeautifulSoup
import re
seq = 0
def clean(text):
    if text:
        return ' '.join(' '.join(text).split())
    return None


def get_headers():
    cookies = []
    session = requests.Session()

    cookie = session.get("https://www.zillow.com/").cookies.get_dict()

    for key in cookie:
        cookies.append(key + "=" + cookie[key])

    headers = {
        'authority': 'www.zillow.com',
        'method': 'GET',
        'scheme': 'https',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'cookie': "; ".join(cookies),
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'max-age=0',
        'referer': 'https://www.zillow.com/agent-finder/real-estate-agent-reviews/?name=Gregg%20Van%20Orden',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
    }

    return headers


def create_url(zipcode, filter):
    # Creating Zillow URL based on the filter.

    if filter == "newest":
        url = "https://www.zillow.com/homes/for_rent/{0}/0_singlestory/days_sort".format(zipcode)
    elif filter == "cheapest":
        url = "https://www.zillow.com/homes/for_rent/{0}/0_singlestory/pricea_sort/".format(zipcode)
    else:
        url = "https://www.zillow.com/homes/for_rent/{0}_rb/?fromHomePage=true&shouldFireSellPageImplicitClaimGA=false&fromHomePageTab=buy".format(zipcode)
    print(url)
    return url


def save_to_file(response):
    # saving response to `response.html`

    with open("response.html", 'w') as fp:
        fp.write(str(response))


def write_data_to_csv(data):
    # saving scraped data to csv.

    with open("properties-%s.csv" % (zipcode), 'wb') as csvfile:
      #  fieldnames = ['title', 'address', 'latitude', 'longitude', 'price', 'facts and features', 'url']
        fieldnames = ['uid', 'name', 'Sqft', 'bedrooms', 'bathrooms', 'price', 'address', 'url', 'latitude', 'longitude','zipcode']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for row in data:
            writer.writerow(row)


def get_response(url):
    # Getting response from zillow.com.

    for i in range(5):
        response = requests.get(url, headers=get_headers())
        print("status code received:", response.status_code)
        if response.status_code != 200:
            # saving response to file for debugging purpose.
            save_to_file(response)
            continue
        else:
            save_to_file(response)
            return response
    return None
'''
def get_data_from_json(raw_json_data, zipcode):
    global seq
    # getting data from json (type 2 of their A/B testing page)

    cleaned_data = clean(raw_json_data).replace('<!--', "").replace("-->", "")
    properties_list = []

    try:
        json_data = json.loads(cleaned_data)
        search_results = json_data.get('searchResults').get('listResults', [])
#       print(json_data.keys())
        print(json_data['searchList']['pagination'])
        for properties in search_results:
            address = properties.get('address')
            position = properties.get('latLong')
            latitude = position['latitude']
            longitude = position['longitude']
            property_info = properties.get('hdpData', {}).get('homeInfo',{})
            name = properties.get('statusText')
           # print(property_info.keys())
           # myzipcode =  property_info.get('zipcode')
            myzipcode = zipcode
            if 'units' in properties:
                allhouses  = properties.get('units', {})
                for house in allhouses:
                    price = house['price']
                    bedrooms = house['beds']
                    #info = f'{bedrooms} bds'
                    property_url = properties.get('detailUrl')
                    title = properties.get('statusText')
                    uid = uuid.uuid4()
                    data = {'uid':uid,
                            'name':name,
                            'bedrooms':bedrooms,
                            'price': price,
                            'address': address,
                            'url': property_url,
                           # 'zipcode':myzipcode,
                            'latitude': latitude,
                            'longitude': longitude,
                            'zipcode':myzipcode
                            # 'city': city,
                            # 'state': state,
                            # 'postal_code': postal_code,

                            #'facts and features': info,
                            # 'real estate provider': broker,

                            #'title': title
                            }
                    properties_list.append(data)
            #city = property_info.get('city')
            #state = property_info.get('state')
            #postal_code = property_info.get('zipcode')
                    seq+=1
            else:
                #uid = str(zipcode) + str(seq)
                uid = uuid.uuid4()
                price = properties.get('price')
                bedrooms = properties.get('beds')
                bathrooms = properties.get('baths')
                area = properties.get('area')
      #      bathrooms = properties.get('baths')
      #      area = properties.get('area')
      #      info = f'{bedrooms} bds, {bathrooms} ba ,{area} sqft'
                info = f'{bedrooms} bds'
      #      broker = properties.get('brokerName')
                property_url = properties.get('detailUrl')
                name = properties.get('statusText')

                data = {'uid':uid,
                        'name':name,
                        'Sqft':area,
                        'bedrooms':bedrooms,
                        'bathrooms':bathrooms,
                        'price':price,
                        'address': address,
                        'url': property_url,
                        #'zipcode': myzipcode,
                        'latitude': latitude,
                        'longitude': longitude,
                        'zipcode': myzipcode}
                    #'city': city,
                    #'state': state,
                    #'postal_code': postal_code,
                   # 'price': price,
                    #'facts and features': info,
          #          'real estate provider': broker,

                    #'title': title}
                properties_list.append(data)
                seq+=1
        new_url = json_data['searchList']['pagination']['nextUrl']
        print(new_url)
        new_url = "https://www.zillow.com"+new_url+"?fromHomePage=true&shouldFireSellPageImplicitClaimGA=false&fromHomePageTab=buy"
        return properties_list, new_url

    except ValueError:
        print("Invalid json")
        return None
'''
def get_data_from_json(raw_json_data, zipcode):
    global seq
    # getting data from json (type 2 of their A/B testing page)

    cleaned_data = clean(raw_json_data).replace('<!--', "").replace("-->", "")
    properties_list = []

    try:
        json_data = json.loads(cleaned_data)
        search_results = json_data.get('searchResults').get('listResults', [])
#       print(json_data.keys())
        print(json_data['searchList']['pagination'])
        for properties in search_results:
            address = properties.get('address')
            position = properties.get('latLong')
            latitude = position['latitude']
            longitude = position['longitude']
            property_info = properties.get('hdpData', {}).get('homeInfo',{})
            name = properties.get('statusText')
           # print(property_info.keys())
           # myzipcode =  property_info.get('zipcode')
            myzipcode = zipcode
            if 'units' in properties:
                property_url = properties.get('detailUrl')
                #print(property_url)
                title = properties.get('statusText')
                #uid = uuid.uuid4()
                #property_url = 'https://www.zillow.com/b/westside-court-atlanta-ga-5jFcmy/'
                temp_response = get_response(property_url)
                #print(temp_response)
                temp_parser = html.fromstring(temp_response.text)
                #print(temp_parser)
                #results = temp_parser.xpath("")
                #soup = BeautifulSoup(temp_response.text, 'lxml')
                #print(soup.li.name)
                #print(soup.prettify())
                #print(soup.find_all('__NEXT_DATA__'))
                #print(soup.find_all('NEXT_DATA'))
                #print(soup.prettify(()))
                result = temp_parser.xpath('/html/body/div[1]/div[7]/div[1]/div[1]/div[2]/div/script[1]/text()')
                #print(result)
                cleaned_data_temp = clean(result).replace('<!--', "").replace("-->", "")
                final_result = re.search('__NEXT_DATA__ = (.*)module', cleaned_data_temp)
                #print(final_result.group(1))
                appartment_detail = final_result.group(1)
                appartment_data = json.loads(appartment_detail).get('props').get('initialData').get('building').get('floorPlans')
                #appartment_data = json.loads(appartment_detail)
                #print(appartment_data['props']['initialData']['building']['homeRecommendations'])
                #print(str(appartment_data))
                if(appartment_data == None):
                   continue
                for house in appartment_data:
                    #print(house)
                    uid = uuid.uuid4()
                    bedrooms = house['beds']
                    price = (house['maxPrice']+house['minPrice'])/2
                    bathrooms = house['baths']
                    area = house['sqft']

                    #print(cleaned_data_temp)
                    #appartment_data = re.findall(".*__NEXT_DATA__ = (.*)module={}.*", cleaned_data_temp)
                    #print(appartment_data[0])
                    #new_appartment_data = json.loads(appartment_data)

                    #print(cleaned_data_temp)
                    #print(cleaned_data_temp.keys())

                    #json_data_temp = json.loads(cleaned_data_temp)
                    #print(json_data_temp)
                    #search_results_temp = json_data_temp.get('__NEXT_DATA__')
                    #print(search_results)

                    data = {'uid':uid,
                            'Sqft':area,
                            'name':name,
                            'bedrooms':bedrooms,
                            'bathrooms':bathrooms,
                            'price': price,
                            'address': address,
                            'url': property_url,
                           # 'zipcode':myzipcode,
                            'latitude': latitude,
                            'longitude': longitude,
                            'zipcode':myzipcode
                            # 'city': city,
                            # 'state': state,
                            # 'postal_code': postal_code,

                            #'facts and features': info,
                            # 'real estate provider': broker,

                            #'title': title
                            }
                    properties_list.append(data)
            #city = property_info.get('city')
            #state = property_info.get('state')
            #postal_code = property_info.get('zipcode')
                    seq+=1
            else:
                #uid = str(zipcode) + str(seq)
                uid = uuid.uuid4()
                price = properties.get('price')
                bedrooms = properties.get('beds')
                bathrooms = properties.get('baths')
                area = properties.get('area')
      #      bathrooms = properties.get('baths')
      #      area = properties.get('area')
      #      info = f'{bedrooms} bds, {bathrooms} ba ,{area} sqft'
                info = f'{bedrooms} bds'
      #      broker = properties.get('brokerName')
                property_url = properties.get('detailUrl')
                name = properties.get('statusText')

                data = {'uid':uid,
                        'name':name,
                        'Sqft':area,
                        'bedrooms':bedrooms,
                        'bathrooms':bathrooms,
                        'price':price,
                        'address': address,
                        'url': property_url,
                        #'zipcode': myzipcode,
                        'latitude': latitude,
                        'longitude': longitude,
                        'zipcode': myzipcode}
                    #'city': city,
                    #'state': state,
                    #'postal_code': postal_code,
                   # 'price': price,
                    #'facts and features': info,
          #          'real estate provider': broker,

                    #'title': title}
                properties_list.append(data)
                seq+=1
        new_url = json_data['searchList']['pagination']['nextUrl']
        print(new_url)
        new_url = "https://www.zillow.com"+new_url+"?fromHomePage=true&shouldFireSellPageImplicitClaimGA=false&fromHomePageTab=buy"
        return properties_list, new_url

    except ValueError:
        print("Invalid json")
        return None

def parse(zipcode, filter=None):
    url = create_url(zipcode, filter)
    result = []
    urllist = []
    page_first_info=[]
    while(url!=None):
        isrepeat=False
        for i in range(len(urllist)):
            if(url == urllist[i]):
                isrepeat = True
        if(isrepeat):
            break
        else:
            urllist.append(url)
            response = get_response(url)

            if not response:
                print("Failed to fetch the page, please check `response.html` to see the response received from zillow.com.")
                return None

            parser = html.fromstring(response.text)
            search_results = parser.xpath("//div[@id='search-results']//article")

            if not search_results:
                print("parsing from json data")
                # identified as type 2 page
                raw_json_data = parser.xpath('//script[@data-zrr-shared-data-key="mobileSearchPageStore"]//text()')
                temp_result, url = get_data_from_json(raw_json_data, zipcode)
                print(temp_result)
                for i in page_first_info:
                    if(temp_result[0]['latitude'] == i):
                        isrepeat = True
                if(isrepeat):
                    break
                else:
                    page_first_info.append(temp_result[0]['latitude'])
                    result.extend(temp_result)

    return result
'''
    print("parsing from html page")
    properties_list = []
    for properties in search_results:
        raw_address = properties.xpath(".//span[@itemprop='address']//span[@itemprop='streetAddress']//text()")
        raw_city = properties.xpath(".//span[@itemprop='address']//span[@itemprop='addressLocality']//text()")
        raw_state = properties.xpath(".//span[@itemprop='address']//span[@itemprop='addressRegion']//text()")
        raw_postal_code = properties.xpath(".//span[@itemprop='address']//span[@itemprop='postalCode']//text()")
        raw_price = properties.xpath(".//span[@class='zsg-photo-card-price']//text()")
        raw_info = properties.xpath(".//span[@class='zsg-photo-card-info']//text()")
   #     raw_broker_name = properties.xpath(".//span[@class='zsg-photo-card-broker-name']//text()")
        url = properties.xpath(".//a[contains(@class,'overlay-link')]/@href")
        raw_title = properties.xpath(".//h4//text()")

        address = clean(raw_address)
        city = clean(raw_city)
        state = clean(raw_state)
        postal_code = clean(raw_postal_code)
        price = clean(raw_price)
        info = clean(raw_info).replace(u"\xb7", ',')
     #   broker = clean(raw_broker_name)
        title = clean(raw_title)
        property_url = "https://www.zillow.com" + url[0] if url else None
  #      is_forsale = properties.xpath('.//span[@class="zsg-icon-for-sale"]')

        properties = {'address': address,
                      'city': city,
                      'state': state,
                      'postal_code': postal_code,
                      'price': price,
                      'facts and features': info,
                      'real estate provider': broker,
                      'url': property_url,
                      'title': title}
    #    if is_forsale:
    #        properties_list.append(properties)


    return properties_list
'''

'''
if __name__ == "__main__":
    # Reading arguments

    argparser = argparse.ArgumentParser(formatter_class=argparse.RawTextHelpFormatter)
    argparser.add_argument('zipcode', help='')
    sortorder_help = """
    available sort orders are :
    newest : Latest property details,
    cheapest : Properties with cheapest price
    """

    argparser.add_argument('sort', nargs='?', help=sortorder_help, default='Homes For You')
    args = argparser.parse_args()
    zipcode = args.zipcode
    sort = args.sort
    print ("Fetching data for %s" % (zipcode))
    scraped_data = parse(zipcode, sort)

    if scraped_data:
        print ("Writing data to output file")
        write_data_to_csv(scraped_data)
'''

zipcodelist =[30030, 30303, 30306, 30307, 30308, 30309, 30310, 30311, 30312, 30313, 30314, 30315, 30316, 30317, 30318, 30324,30329, 30344, 30354, 30363]
#zipcodelist = [30318]
for zipcode in zipcodelist:
    print(zipcode)
    scraped_data = parse(zipcode)
    if scraped_data:
        print("Writing data to output file")
        write_data_to_csv(scraped_data)