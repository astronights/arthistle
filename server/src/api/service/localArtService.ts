import config from "../../config/config";
import type { artist } from "../../model/artist";
import { BaseArtService } from "./baseArtService";
import top_100_artists from "../../data/wiki_top_100_artists.json";
import paintings_by_artist from "../../data/wiki_paintings_by_artist.json";
import { getLocalDate, getLocalDateTomorrow } from "../../util/dateUtil";
import { artistForDate } from "../../util/dailyUtil";

export class LocalArtService extends BaseArtService {
  top_artists: { [key: string]: any } = top_100_artists;
  works_by_artists: { [key: string]: any } = paintings_by_artist;

  // The day's artist is worked out from the date and nothing else, so every
  // request for a date returns the same puzzle.
  //
  // It used to pick at random and store the result against the server's own
  // UTC date, while the client asks by its local date. For anyone whose local
  // date had already rolled over - just past midnight in Singapore, say - the
  // stored row was never found, so every refresh drew a fresh artist. Two
  // people asking at the same moment could also race and both save.
  public getArtToday = async (date?: string): Promise<artist> => {
    return Promise.resolve(this.getArtForDate(this.resolveDate(date)));
  };

  // Ignore anything past tomorrow or before the game existed.
  private resolveDate = (date?: string): string =>
    !date || date > getLocalDateTomorrow() || date < config.art.inception
      ? getLocalDate()
      : date;

  private getArtForDate = (date: string): artist => {
    const artist_id = artistForDate(
      Object.keys(this.top_artists),
      date,
      config.art.inception
    );

    return {
      _id: artist_id,
      name: this.top_artists[artist_id].artistName,
      url: this.top_artists[artist_id].artistUrl,
      date: date,
      // Copy before reversing: reverse() works in place, so reversing the
      // imported array directly flipped the order for every later request.
      art: [...this.works_by_artists[artist_id]].reverse(),
    };
  };
}
