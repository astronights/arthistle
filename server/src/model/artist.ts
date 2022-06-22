import mongoose from "../db/mongo";

const artSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    year: Number,
    url: String,
  },
  { _id: false }
);
const artistSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    url: String,
    date: String,
    art: [artSchema],
  },
  { _id: false }
);

export interface art {
  _id: string;
  name: string;
  year: number;
  url: string;
}

export interface artist extends mongoose.Document {
  _id: string;
  name: string;
  url: string;
  date: string;
  art: art[];
}

export default mongoose.model<artist>("artist", artistSchema);
