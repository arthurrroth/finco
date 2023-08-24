import jwt from "jsonwebtoken";
import config from "config";
import logs from "./logger";
import fs from "fs";
import { string } from "zod";

export const signJWT = (
  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) => {
  const privateKeyString = config.get<string>(keyName);
  let signingKey = "";

  if (keyName == "accessTokenPrivateKey") {
    logs.info("sign in test");
    signingKey = fs.readFileSync(
      "/Users/supercoder/Desktop/Supercode/Projekte/AbschlussProject_Finco/root/server/config/access_private_key.pem",
      "utf8"
    );
  }

  if (keyName == "refreshTokenPrivateKey") {
    signingKey = fs.readFileSync("../config/refresh_private_key.pem", "utf8");
  }

  logs.info(`Signing Key: ${signingKey}`);

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJWT = <T>(
  token: string,
  keyName: "refreshTokenPublicKey" | "accessTokenPublicKey"
): T | null => {
  let publicKey = "";

  if (keyName == "refreshTokenPublicKey") {
    publicKey = fs.readFileSync("../config/refresh_public_key.pem", "utf8");
  }

  if (keyName == "accessTokenPublicKey") {
    publicKey = fs.readFileSync("../config/access_public_key.pem", "utf8");
  }

  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (err: any) {
    logs.info(`Error on verifyJWT: ${err.message}`);
    return null;
  }
};
