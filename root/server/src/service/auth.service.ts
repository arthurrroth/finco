import { DocumentType } from "@typegoose/typegoose";
import { omit } from "lodash"
import { User, privateFields } from "../model/user.model";
import { signJWT } from "../utils/jwt";
import SessionModel from "../model/session.model";
import log from "../utils/logger";
import dotenv from "dotenv";

dotenv.config();


export const createSession = async ({ userId }: { userId: string }) => {

  return SessionModel.create({ user: userId })
};

export const signRefreshToken = async ({ userId }: { userId: string }) => {

  const session = await createSession({
    userId,
  });

  const refreshToken = signJWT(
    {
      session: session._id,
    },
    "refreshTokenPrivateKey", 
    {
      expiresIn: "1y"
    }
  );

  return refreshToken;

};



export const signAccessToken = (user: DocumentType<User>) => {

  const payload = omit(user.toJSON(), privateFields);
  const logMessage = JSON.stringify(payload);
  log.info(`Payload: ${logMessage}`);

  const accessToken = signJWT(payload, "accessTokenPrivateKey", {
    expiresIn: "15m",
  });
  // log.info(`Access Token Private Key: ${config.get("accessTokenPrivateKey")}`);                                                    

  return accessToken;
};

export const findSessionById = async (id: string) => {
 return SessionModel.findById(id);
}
