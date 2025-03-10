import requests
import json
import copy


url = 'https://www.wikiart.org/en/api/2/MostViewedPaintings'

n_page = 1
refresh = False

artists = {}
artists_with_5 = {}

data = requests.get(url).json()

while(len(artists_with_5) < 100):

    if(refresh == False):
        for painting in data['data']:
            artist_id = painting['artistId']

            if artist_id not in artists:
                artists[artist_id] = {'artistName': painting['artistName'], 'artistUrl': painting['artistUrl'], 'works': []}
            
            artists[artist_id]['works'].append({'_id': painting['id'], 'name': painting['title'], 'year': painting['completitionYear'], 'url': painting['image']})
            
            if(len(artists[artist_id]['works']) == 5):
                artists_with_5[artist_id] = copy.deepcopy(artists[artist_id])
                print(len(artists_with_5), painting['artistName'])

        refresh = True
    else:
        if(data['hasMore'] == True):
            new_url = f"{url}?paginationToken={data['paginationToken']}"
            print('Page ', n_page)
            n_page += 1
            data = requests.get(new_url).json()
            refresh = False
        else:
            print("No More Paintings...")


top_artists = {}

for artist_id, artist_details in artists_with_5.items():
    top_artists[artist_id] = {
        'artistName': artist_details['artistName'],
        'artistUrl': artist_details['artistUrl']
    }

with open("server/src/data/wiki_top_100_artists.json", "w") as outfile:
    json.dump(top_artists, outfile)

artist_works = {}

for artist_id, artist_details in artists_with_5.items():
    artist_works[artist_id] = artist_details['works']

with open("server/src/data/wiki_paintings_by_artist.json", "w") as outfile:
    json.dump(artist_works, outfile)