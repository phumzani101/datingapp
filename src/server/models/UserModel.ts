"use server";
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import slugify from "slugify";
import mongoosePaginate from "mongoose-paginate-v2";
import { v4 as uuidv4 } from "uuid";

export interface UserDocument extends Document {
  name: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  gender?: string;
  description?: string;
  phone?: string;
  password?: string;
  bio?: string;
  image?: string;
  location?: string;
  website?: string;
  social?: {
    whatsapp?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  street: string;
  province: string;
  city: string;
  postalcode: string;
  usertype: string;
  reputation?: number;
  role: string;
  status?: string;
  provider?: string;
  emailVerified?: Date;
  dateOfBirth?: Date;
  agreeTerms: boolean;
  saved: Schema.Types.ObjectId[] | string[];
  accounts: Schema.Types.ObjectId[] | string[];
  sessions: Schema.Types.ObjectId[] | string[];
  token?: string;
  tokenExpiresAt?: Date;
  views?: number;
  slug?: string;
  uploads: Schema.Types.ObjectId[] | string[];
  avatar: Schema.Types.ObjectId | string;
  followers?: Schema.Types.ObjectId[] | string[];
  following?: Schema.Types.ObjectId[] | string[];
}

interface Method {
  authenticate(password: string): Promise<boolean>;
}

const UserSchema = new Schema<UserDocument, {}, Method>(
  {
    name: { type: String, required: true },
    username: { type: String },
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    password: { type: String, select: false },
    image: String,
    avatar: {
      type: Schema.Types.ObjectId,
      ref: "Upload",
    },
    bio: { type: String },
    location: { type: String },
    website: { type: String },
    phone: { type: String },
    social: {
      whatsapp: { type: String },
      facebook: {
        type: String,
        trim: true,
      },
      twitter: {
        type: String,
        trim: true,
      },
      instagram: {
        type: String,
        trim: true,
      },
      linkedin: {
        type: String,
        trim: true,
      },
    },

    street: {
      type: String,
      trim: true,
    },
    province: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    postalcode: {
      type: String,
      trim: true,
    },
    usertype: {
      type: String,
      enum: ["private", "business"],
      default: "private",
    },
    views: { type: Number, default: 0 },
    reputation: { type: Number, default: 0 },
    saved: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "pending", "blocked", "archived"],
      default: "active",
    },
    agreeTerms: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      default: "credentials",
    },
    dateOfBirth: Date,
    uploads: [
      {
        type: Schema.Types.ObjectId,
        ref: "Upload",
      },
    ],
    accounts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Account",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    emailVerified: { type: Date },
    token: { type: String },
    tokenExpiresAt: { type: Date },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
    // toJSON: { virtuals: true },
  }
);

UserSchema.plugin(mongoosePaginate);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  // @ts-ignore: Unreachable code error
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.authenticate = async function (userPassword: string) {
  return await bcrypt.compare(userPassword, this.password as string);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("name")) return next();
  // @ts-ignore: Unreachable code error
  const randomString = Math.floor(Math.random() * Date.now()).toString(36);

  this.slug = slugify(`${this.name} ${randomString}`, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: "en", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
  next();
});

UserSchema.methods.generateToken = async function () {
  const resetToken = uuidv4();
  this.token = resetToken;
  this.tokenExpiresAt = new Date(Date.now() + 7200 * 1000);
  return resetToken;
};

const UserModel =
  mongoose?.models?.User || mongoose?.model<UserDocument>("User", UserSchema);

// Create a Mongoose schema for the Account model
const AccountSchema = new Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
});

const AccountModel =
  mongoose?.models?.Account || mongoose.model("Account", AccountSchema);

// // Create a Mongoose schema for the Session model
// const SessionSchema = new Schema({
//   id: {
//     type: String,
//     required: true,
//     unique: true,
//     default: Schema.Types.ObjectId,
//   },
//   sessionToken: { type: String, required: true, unique: true },
//   userId: { type: String, required: true },
//   expires: Date,
// });

// const SessionModel = mongoose.models.Session || mongoose.model("Session", SessionSchema);

// // Create a Mongoose schema for the VerificationToken model
// const VerificationTokenSchema = new Schema({
//   identifier: { type: String },
//   email: { type: String },
//   user: { type: Schema.Types.ObjectId, ref: "User" },
// });

// const VerificationTokenModel =
//   mongoose.models.VerificationToken ||
//   mongoose.model("VerificationToken", VerificationTokenSchema);

export { AccountModel };

export default UserModel;
