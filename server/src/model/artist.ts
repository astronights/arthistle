import mongoose from "../db/mongo";

export interface art {
  _id: string;
  name: string;
  year: number;
  url: string;
}

export interface artist {
  _id: string;
  name: string;
  url: string;
  date: string;
  art: art[];
}

const artSchema = new mongoose.Schema<art>(
  {
    _id: String,
    name: String,
    year: Number,
    url: String,
  },
  { _id: false }
);

const artistSchema = new mongoose.Schema<artist>(
  {
    _id: String,
    name: String,
    url: String,
    date: String,
    art: [artSchema],
  },
  { _id: false }
);

export default mongoose.model<artist>("artist", artistSchema);
