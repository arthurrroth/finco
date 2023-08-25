import { getModelForClass, prop, modelOptions, Severity, pre, DocumentType, index } from "@typegoose/typegoose";
import argon2 from "argon2";
import crypto from "crypto";
import log from "../utils/logger";

export const privateFields = [
  "password",
  "__v",
  "verificationCode",
  "resetPasswordCode",
  "verified",
];

@pre<User>("save", async function() {
  if (!this.isModified('password')) {
    return;
  }

  const hash = await argon2.hash(this.password);
  this.password = hash;
})

@index({ email: 1 })

@modelOptions({

  schemaOptions: {
    timestamps: true
  },

  options: {
    allowMixed: Severity.ALLOW
  }
})

export class User {

  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true, unique: true })
  username: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, default: () => crypto.randomUUID() })
  verificationCode: string;

  @prop()
  resetPasswordCode: string | null;

  @prop({ default: false })
  verified: boolean;

  async validatePassword(this: DocumentType<User>, candidatePassword: string) {

    try {

      return await argon2.verify(this.password, candidatePassword)

    } catch (err: any) {

      log.error(err, 'Could not validate password');
      return false

    };
  };
};

const UserModel = getModelForClass(User);

export default UserModel;
