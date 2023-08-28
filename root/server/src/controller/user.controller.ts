import { Request, Response } from "express";
import crypto from "crypto";
import { ForgotPasswordInput, ResetPasswordInput, UserCreationInput, UserUpdateInput, UserVerificationInput } from "../schema/user.schema";
import { createAcc, createUser, findAccByUser, findUserByEmail, findUserById } from "../service/user.service";
import { sendMailx } from "../utils/mailer";
import log from "../utils/logger";
import UserModel from "../model/user.model";
import UserAccModel from "../model/fincoAcc.model";

export const userCreationHandler =
  //     Request<noReqParams, noReqQuery, reqBody> because our Schema only defines body:
  async (req: Request<{}, {}, UserCreationInput>, res: Response) => {

    const body = req.body;
    log.info('Started User Creation')

    try {

      const user = await createUser(body);
      const acc = await createAcc(user);

      log.info('User successfully created');
      log.info(`User Account created: ${acc}`);

      const userVerification = await sendMailx({
        from: 'test@example.com',
        to: user.email,
        subject: 'Please verify your account',
        html: `   <html>
        <main>
          <h3>Dear ${user.username},</h3>
          <p>
            We have received a request to reset the password for your account. To
            proceed with this request, please follow the instructions below to set
            a new password:
          </p>
          <br />
    
          <p>1. This is your Code: <h4>${user.verificationCode}</h4></p>
          <p>
            2. You will be directed to a page where you can enter your new
            password.
          </p>
          <p>
            3. Choose a strong and secure password that includes a combination of
            uppercase and lowercase letters, numbers, and special characters.
          </p>
          <p>4. Confirm the new password by entering it again.</p>
          <p>
            5. Once your new password is confirmed, you will be able to log in to
            your account using the updated credentials.
          </p>
    
          <br />
          <p>
            If you did not initiate this password reset request, please disregard
            this email. Your account security is important to us, and no changes
            will be made unless you take action through the provided link.
          </p>
          <br />
          <p>
            Thank you for using our services. If you have any questions or
            concerns, please feel free to contact our support team
          </p>
          <br />
          <p>Best regards,</p>
          <p>Your Finco Team</p>
        </main>
        </html>`,

      });


      //const userAcc = findAccByUser(user._id.toString());

      return res.send({
        previewURL: userVerification,
        userID: user.id,
        userAcc: acc,
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


export const getCurrentUserHandler = async (_: Request, res: Response) => {
  return res.send(res.locals.user)
};

export const getCurrentAccHandler = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send('No user found on Account Search');
    };
    const acc = await findAccByUser(user);
    log.info(`Found Account: ${acc}`);
    return res.send(JSON.stringify(acc));
  } catch (error: any) {
    log.info('Failed to retrieve User Account');
  }
};

export const updateUserHandler = async (req: Request, res: Response) => {

  const { accID, field } = req.params;
  const { value } = req.body;

  log.info(`Update User Handler: ${field}, ${value}`)

  try {

    const account = UserAccModel.findById(accID);

    if (!account) {
      return res.status(404).send('Could not find User Account while trying to update user!');
    };

    switch (field) {
      case "wallet":
        log.info(`Updating the wallet with: ${value}`)
        account.Wallet = value;
        await account.save();
        break;

      case "displayName":
        account.displayName = value;
        await account.save();
        break;

      case "profilePicture":
        account.profilePicture = value;
        await account.save();
        break;

      default:
        return res.status(400).send('Passed not a valid field to the updateUserHandler!');
    }

    return res.send(account)

  } catch (err: any) {
    return res.status(err.code).send('Could not update user!')
  };
};
