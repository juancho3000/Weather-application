import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    place: { type: String, },
    phone: { type: Number,  },
    password: { type: String, required: true },
    img: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/01/65/63/94/360_F_165639425_kRh61s497pV7IOPAjwjme1btB8ICkV0L.jpg",
    },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

const Users = model(collection, schema);

export default Users;
