import { readFileSync } from "fs";

const accessKey = readFileSync("config/access_private_key.pem");
const refreshKey = readFileSync("config/refresh_private_key.pem");
const pubAccess = readFileSync("config/access_public_key.pem");
const pubRefresh = readFileSync("config/refresh_public_key.pem");

export default {
  port: 3008,
  dbURI: "mongodb+srv://dbAdmin:SmNbaV1qYWZ1@finco.atlizpm.mongodb.net/finco",
  loglevel: "info",
  accessTokenPrivateKey: accessKey,
  refreshTokenPrivateKey: refreshKey,
  accessTokenPublicKey: pubAccess,
  refreshTokenPublicKey: pubRefresh,
  smtp: {

    user: 'nfeu7glouvrdaupn@ethereal.email',
    pass: 'AJ1PFGBgBxnATm3CVW',
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,

  },


};
