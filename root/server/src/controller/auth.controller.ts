import { Request, Response } from "express";
import { CreateSessionInput } from "../schema/auth.schema";
import { findAccByUser, findUserByEmail, findUserById } from "../service/user.service";
import { findSessionById, signAccessToken, signRefreshToken } from "../service/auth.service";
import log from "../utils/logger";
import { get } from "lodash";
import { verifyJWT } from "../utils/jwt";


export const createSessionHandler = async (req: Request<{}, {}, CreateSessionInput>, res: Response) => {

  const { email, password } = req.body;
  const message = 'Invalid login credentials'
  const user = await findUserByEmail(email);

  if (!user) {
    return res.send(message);
  }

  if (!user.verified) {
    return res.send('Please verify your email');
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return res.send(message);
  };

  log.info(`"signAccessToken" started 🛫`);
  const accessToken = signAccessToken(user);
  log.info('"signAccessToken" finished!');

  const refreshToken = await signRefreshToken({ userId: user._id.toString() });

  const acc = await findAccByUser(user);
  return res.send({
    accessToken,
    refreshToken,
    acc
  })
};

export const refreshAccessTokenHandler = async (req: Request, res: Response) => {

  const refreshToken = get(req, 'headers.x-refresh')
  if (!refreshToken) {
    return res.send('No refreshToken')
  }
  const decoded = verifyJWT<{ session: string }>(refreshToken.toString(), "refreshTokenPublicKey")

  if (!decoded) {
    return res.status(401).send("Could not refresh access token");
  };

  const session = await findSessionById(decoded.session);

  if (!session || !session.valid) {
    return res.status(401).send("Could not refresh access token");
  };

  const user = await findUserById(String(session.user));

  if (!user) {
    return res.status(401).send("Could not refresh access token");
  };

  const accessToken = signAccessToken(user)

  return res.send({ accessToken });

}

