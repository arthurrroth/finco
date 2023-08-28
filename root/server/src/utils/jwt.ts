import jwt from "jsonwebtoken";
import config from "config";
import logs from "./logger";
import fs from "fs";

export const signJWT = (

  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined) => {


  const signingKey = config.get<string>(keyName);


  logs.info(`Signing Key: ${signingKey}`);

  return jwt.sign(object, signingKey, {

    ...(options && options),
    algorithm: 'RS256',

  });
};

export const verifyJWT = <T>(
  token: string,
  keyName: "refreshTokenPublicKey" | "accessTokenPublicKey"): T | null => {

  let publicKey = config.get<string>(keyName);


  try {

    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;

  } catch (err: any) {
    logs.info(`Error on verifyJWT: ${err.message}`)
    return null;
  }

};
