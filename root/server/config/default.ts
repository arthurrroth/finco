import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(path.resolve(), "..", ".env"),
});


export default {
  port: process.env.PORT,
  dbURI: process.env.DBURI,
  loglevel: "info",
  accessTokenPrivateKey: process.env.ACCESS_PRIVATE_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_PRIVATE_KEY,
  accessTokenPublicKey: process.env.ACCESS_PUBLIC_KEY,
  refreshTokenPublicKey: process.env.REFRESH_PUBLIC_KEY,
  smtp: {

    user: 'nfeu7glouvrdaupn@ethereal.email',
    pass: 'AJ1PFGBgBxnATm3CVW',
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,

  },


};
