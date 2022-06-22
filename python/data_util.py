import pandas as pd
import requests
import urllib
import json


url = 'https://www.wikiart.org/en/api/2/MostViewedPaintings'

artists = {}
refresh = False
data = requests.get(url).json()

while(len(artists.items()) < 100):
    if(refresh == False):
        for painting in data['data']:
            if painting['artistId'] not in artists:
                print(painting['artistName'], len(artists.items()))
                artists[painting['artistId']] = {'artistName': painting['artistName'], 'artistUrl': painting['artistUrl']}
        refresh = True
    else:
        if(data['hasMore'] == True):
            new_url = f"{url}?paginationToken={data['paginationToken']}"
            print(new_url)
            data = requests.get(new_url).json()
            refresh = False
        else:
            print("No More Paintings...")

with open("wiki_top_100_artists.json", "w") as outfile:
    json.dump(artists, outfile)