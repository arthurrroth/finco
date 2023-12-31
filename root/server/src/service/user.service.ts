import { DocumentType, Ref } from "@typegoose/typegoose";
import UserAccModel, { UserAcc } from "../model/fincoAcc.model";
import UserModel, { User } from "../model/user.model";
import log from "../utils/logger";
import { ObjectId } from "mongoose";

export const createUser = (input: Partial<User>) => {
  log.info('Started creating user 🧟')

  return UserModel.create(input)

};

export const createAcc = (user: DocumentType<User>) => {
  const account = new UserAcc(user);
  return UserAccModel.create(account)
};

export const findUserById = (id: string) => {
  return UserModel.findById(id)
};


export const findUserByEmail = (email: string) => {
  return UserModel.findOne({ email });
};

export const findAccById = (id: string) => {

  return UserAccModel.findById(id);
};

export const findAccByUser = async (user: DocumentType<User>) => {
  const userAcc = await UserAccModel.findOne({ linkedUser: user._id }).exec();
  return userAcc;
}

