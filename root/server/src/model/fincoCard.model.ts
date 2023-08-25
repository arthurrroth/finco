import { DocumentType, Ref, Severity, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Transaction } from "./fincoTx.model";
import { UserAcc } from "./fincoAcc.model";

@modelOptions({

  schemaOptions: {
    timestamps: true
  },

  options: {
    allowMixed: Severity.ALLOW
  }
})

export class Card {

  @prop({ ref: () => UserAcc, required: true })
  refUserAcc: Ref<UserAcc>;

  @prop({ required: true, unique: true })
  cardNumber: string;

  @prop({ required: true, default: 'Default Account' })
  cardTitle: string;

  @prop({ required: false, default: 'Track your income and expenses!' })
  cardDescription: string;

  @prop({ required: true, default: [] })
  transactions: Transaction[];

  constructor(user: DocumentType<UserAcc>, number: string, title: string | undefined, desc: string | undefined) {

    if (!desc) {
      this.cardDescription = 'Track your income and expenses!';
    } else {
      this.cardDescription = desc;
    };

    if (!title) {
      this.cardTitle = `${user.displayName}'s Account`;
    } else {
      this.cardTitle = title;
    }

    this.refUserAcc = user._id;
    this.cardNumber = number;
  }
};

const CardModel = getModelForClass(Card);

export default CardModel;
