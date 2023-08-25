import { Request, Response } from "express";
import crypto from "crypto";
import { ForgotPasswordInput, ResetPasswordInput, UserCreationInput, UserVerificationInput } from "../schema/user.schema";
import { createAcc, createUser, findUserByEmail, findUserById } from "../service/user.service";
import { sendMailx } from "../utils/mailer";
import log from "../utils/logger";

export const userCreationHandler =
  //     Request<noReqParams, noReqQuery, reqBody> because our Schema only defines body:
  async (req: Request<{}, {}, UserCreationInput>, res: Response) => {

    const body = req.body;
    log.info('Started User Creation')

    try {

      const user = await createUser(body);
      await createAcc(user);

      log.info('User successfully created')

      const userVerification = await sendMailx({
        from: 'test@example.com',
        to: user.email,
        subject: 'Please verify your account',
        text: `<html><h2>verification code ${user.verificationCode} // id: ${user.id}</h2></html>`,

      });

      return res.send({
        previewURL: userVerification,
        userID: user.id
      });

    } catch (err: any) {
      // 11000 'unique' constraint has been violated
      if (err.code === 11000) {
        // 409 - There was a conflict
        return res.status(409).send('Account already exists');
      };
      return res.status(500).send(err.message);
    };
  };

export const userVerificationHandler = async (req: Request<UserVerificationInput>, res: Response) => {
  const id = req.params.id;
  const verificationCode = req.params.verificationCode;

  const user = await findUserById(id);


  if (!user) {
    return res.send('Could not find user')
  };

  if (user.verified) {
    return res.send('User is already verified')
  };

  if (user.verificationCode === verificationCode) {
    user.verified = true;

    await user.save();

    return res.send('User successfully verified')
  };

  return res.send('Could not verify user')
};

export const forgotPasswordHandler = async (req: Request<{}, {}, ForgotPasswordInput>, res: Response) => {
  const { email } = req.body;
  const message = 'If a user with the provided email exists, you will receive a password reset email';

  const user = await findUserByEmail(email);

  if (!user) {
    log.debug(`User with email ${email} does not exist!`)
    res.send(message);
  };

  if (!user?.verified) {
    return res.send('User not verified')
  };

  const passwordResetCode = crypto.randomUUID();

  user.resetPasswordCode = passwordResetCode;

  await user.save();

  const resetPassMail = await sendMailx({
    to: user.email,
    from: 'test@example.com',
    subject: 'Reset your password',
    text: `Password reset code: ${passwordResetCode} for Account with id ${user.id}`,
  });
  log.info(resetPassMail);
  log.debug(`Password Reset Code sent to ${user.email}`)
  return res.send(message);
};

export const resetPasswordHandler = async (req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>, res: Response) => {
  const { id, resetPasswordCode } = req.params;
  const { password } = req.body;

  const user = await findUserById(id);

  if (!user || !user.resetPasswordCode || user.resetPasswordCode !== resetPasswordCode) {
    return res.status(400).send('Could not reset user password')
  };

  user.resetPasswordCode = null;

  user.password = password;

  await user.save()

  return res.send('Successfully updated password');

};


export const getCurrentUserHandler = async (req: Request, res: Response) => {
  return res.send(res.locals.user)
};
