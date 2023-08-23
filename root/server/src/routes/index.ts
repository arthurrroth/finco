import express, { Response } from "express";
import log from "../utils/logger";
import userRouter from "./user.routes.ts";
import authRouter from "./auth.routes.ts";
import fincoRouter from "./finco.routes.ts";

const router = express.Router();

router.get('/healthcheck', (_, res: Response) => {
  log.info('Router is running! 🧭')
  res.sendStatus(200);
});

router.use(userRouter);
router.use(authRouter);
router.use(fincoRouter);

export default router;
