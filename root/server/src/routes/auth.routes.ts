import express from "express";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schema/auth.schema";
import { createSessionHandler, refreshAccessTokenHandler } from "../controller/auth.controller";

const authRouter = express.Router();

authRouter.post(
  '/auth-api/sessions',
  validateResource(createSessionSchema),
  createSessionHandler
);
authRouter.post(
  '/auth-api/sessions/refresh',
  refreshAccessTokenHandler
);

export default authRouter;


