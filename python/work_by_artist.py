import pandas as pd
import requests
import urllib
import json


url = 'https://www.wikiart.org/en/api/2/PaintingsByArtist?'

artists = json.load(open("server/src/data/wiki_top_100_artists.json"))
artist_works = {}

for artist_id, artist_details in artists.items():
    print(f'Querying {artist_details["artistName"]}')
    data = requests.get(url + f'id={artist_id}').json()['data']
    works = []
    for work in data:
        works.append({
            '_id': work['id'],
            'name': work['title'],
            'year': work['completitionYear'],
            'url': work['image'],
        })
    artist_works[artist_id] = works

with open("server/src/data/wiki_paintings_by_artist.json", "w") as outfile:
    json.dump(artist_works, outfile)