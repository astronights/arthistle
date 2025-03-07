import _ from "lodash";
import axios, { AxiosResponse } from "axios";
import config from "../../config/config";
import Artist, { art, artist } from "../../model/artist";
import { BaseArtService } from "./baseArtService";
import top_100_artists from "../../data/wiki_top_100_artists.json";
import { getLocalDate, getLocalDateTomorrow } from "../../util/dateUtil";

export class WikiArtService extends BaseArtService {
  top_artists: { [key: string]: any } = top_100_artists;
  public getArtToday = async (date?: string): Promise<artist> => {
    const localDate =
      !date || date > getLocalDateTomorrow() || date < config.art.inception
        ? getLocalDate()
        : date;
    console.log(`Server: ${date}, ${localDate}`);

    let daily_artist = <artist>await Artist.findOne({ date: localDate }).catch(
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );
    if (daily_artist == null) {
      return this.generateDailyArt();
    } else {
      return Promise.resolve(daily_artist);
    }
  };

  private generateDailyArt = async (): Promise<artist> => {
    const a_ids = Object.keys(top_100_artists);
    const random_aid = a_ids[Math.floor(Math.random() * a_ids.length)];
    return this.getArtByArtist(random_aid);
  };

  private getArtByArtist = async (artist_id: string): Promise<artist> => {
    const url =
      config.art.wiki.host.public + `/PaintingsByArtist?id=${artist_id}`;
    const response: AxiosResponse = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        "Referer": "https://www.wikiart.org/",
        "Accept-Language": "en-US,en;q=0.9",
      },
    }).catch((error) => {
      console.log(error);
      return Promise.reject("WikiArt Error");
    });
    let art = _.sampleSize(response.data.data, 5).map((work) => {
      return <art>{
        _id: work.id,
        name: work.title,
        year: work.year,
        url: work.image,
      };
    });
    console.log(this.top_artists[artist_id]);
    let dailyArt = new Artist({
      _id: artist_id,
      name: this.top_artists[artist_id].artistName,
      url: this.top_artists[artist_id].artistUrl,
      date: getLocalDate(),
      art: art,
    });
    return Promise.resolve(dailyArt.save());
  };
}
