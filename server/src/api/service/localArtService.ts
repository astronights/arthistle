import _ from "lodash";
import config from "../../config/config";
import Artist, { art, artist } from "../../model/artist";
import { BaseArtService } from "./baseArtService";
import top_100_artists from "../../data/wiki_top_100_artists.json";
import paintings_by_artist from "../../data/wiki_paintings_by_artist.json";
import { getLocalDate, getLocalDateTomorrow } from "../../util/dateUtil";

export class LocalArtService extends BaseArtService {
  top_artists: { [key: string]: any } = top_100_artists;
  works_by_artists: { [key: string]: any } = paintings_by_artist;

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
    const art = this.works_by_artists[artist_id].reverse();
    console.log(art);
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
