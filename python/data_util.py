import pandas as pd

data = pd.read_csv('../server/src/data/MetObjects.csv')

artists = list(data[data['Is Highlight'] == True]['Artist Display Name'].drop_duplicates())
print(artists)
# print(data.groupby(["Artist Display Name"]).size().sort_values(ascending=False))