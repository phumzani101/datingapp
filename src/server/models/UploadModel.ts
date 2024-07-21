import mongoose, { Document, Model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export interface UploadDocument extends Document {
  name?: string;
  url: string;
  full_url: string;
  public_id?: string;
  size?: string;
  folder?: string;
  storageType?: string;
  kind?: string;
  user?: Schema.Types.ObjectId;
}

const UploadSchema = new Schema<UploadDocument>(
  {
    name: {
      type: String,
      trim: true,
    },
    url: String,
    full_url: String,
    public_id: String,
    size: String,
    folder: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    storageType: {
      type: String,
      default: "FileStorage",
    },
    kind: {
      type: String,
      enum: ["listing", "article", "user"],
      default: "listing",
    },
  },
  {
    timestamps: true,
  }
);

UploadSchema.plugin(mongoosePaginate);

// UploadSchema.pre(/^find/, function (next) {
//   // this.populate({
//   //   path: "user",
//   //   model: "User",
//   //   select: "name slug",
//   // });

//   next();
// });

let UploadModel =
  mongoose?.models?.Upload ||
  mongoose?.model<UploadDocument>("Upload", UploadSchema);
export default UploadModel;
