import { DocumentType, getModelForClass, modelOptions, prop, Ref, Severity } from "@typegoose/typegoose";
import { User } from "./user.model";
import { Card } from "./fincoCard.model";


@modelOptions({

  schemaOptions: {
    timestamps: true
  },

  options: {
    allowMixed: Severity.ALLOW
  }
})

export class UserAcc {

  @prop({ ref: () => User, required: true })
  linkedUser: Ref<User>;

  @prop({ required: true, default: [] })
  Wallet: Card[];

  @prop({ required: false })
  displayName: string;

  @prop({ required: false, default: "../../config/baseProfile.png" })
  profilePicture: string;

  constructor(user: DocumentType<User>) {
    this.linkedUser = user._id;
    this.displayName = user.username;
  };

};

const UserAccModel = getModelForClass(UserAcc);

export default UserAccModel;
