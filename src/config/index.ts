import dotenv from "dotenv";

dotenv.config();

const config = {
  siteUrl: process.env.SITE_URL || "http://locahost:3000",
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/skeletondb",
  port: parseInt(process.env.PORT!, 10) || 9090,
  dev: process.env.NODE_ENV !== "production",
  jwtSecret: process.env.JWT_SECRET_KEY || "secret-key",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  jwtResetKey: process.env.JWT_RESET_KEY || "reset-key",
  jwtAccountActivationKey:
    process.env.JWT_ACCOUNT_ACTIVATION_KEY || "activate-acc",
  cookieExpires: process.env.COOKIE_EXPIRES || "1d",
  mailDriver: process.env.MAIL_DRIVER || "smtp",
  mailHost: process.env.MAIL_HOST || "smtp.mailtrap.io",
  mailPort: process.env.MAIL_PORT || 2525,
  mailUsername: process.env.MAIL_USERNAME,
  mailPassword: process.env.MAIL_PASSWORD,
  mailEncryption: process.env.MAIL_ENCRYPTION || "tls",
  mailFromEmail: process.env.MAILMAIL_FROM_EMAIL || "noreply@nomayini.com",
  mailFromName: process.env.MAIL_FROM_NAME || "nomayini",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "",
  googleClientID: process.env.GOOGLE_CLIENT_ID || "",
};

export default config;
