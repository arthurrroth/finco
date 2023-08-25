import express from "express";
import validateResource from "../middleware/validateResource";
import { forgotPasswordSchema, resetPasswordSchema, userCreationSchema, userVerificationSchema } from "../schema/user.schema";
import { forgotPasswordHandler, getCurrentUserHandler, resetPasswordHandler, userCreationHandler, userVerificationHandler } from "../controller/user.controller";
import requireUser from "../middleware/requireUser";

const userRouter = express.Router();

userRouter.post(
  '/auth-api/users/create-user', //Path 
  validateResource(userCreationSchema), // Middleware
  userCreationHandler // Handler 
);

userRouter.get(
  '/auth-api/users/verify-user/:id/:verificationCode',
  validateResource(userVerificationSchema),
  userVerificationHandler
);

userRouter.get(
  '/auth-api/users/forgot-password',
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);

userRouter.post(
  '/auth-api/users/reset-password/:id/:resetPasswordCode',
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

userRouter.get(
  '/auth-api/users/me',
  requireUser,
  getCurrentUserHandler
);

export default userRouter;
