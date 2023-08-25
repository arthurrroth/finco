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

  @prop({ required: true })
  cardTitle: string;

  @prop({ required: false })
  cardDescription: string;

  @prop({ required: true })
  cardDesign: string;

  @prop({ required: false })
  spendingLimit: number;

  @prop({ required: true, default: [] })
  transactions: Transaction[];

  constructor(
    user: DocumentType<UserAcc>,
    number: string,
    title: string | undefined,
    desc: string | undefined,
    cardDesign: string,
    spendingLimit: number | undefined) {

    if (!desc) {
      this.cardDescription = 'Track your income and expenses!';
    } else {
      this.cardDescription = desc;
    };

    if (!title) {
      this.cardTitle = `${user.displayName}'s Account`;
    } else {
      this.cardTitle = title;
    };

    if (!spendingLimit) {
      this.spendingLimit = 0;
    } else {
      this.spendingLimit = spendingLimit;
    }

    this.refUserAcc = user._id;
    this.cardNumber = number;
    this.cardDesign = cardDesign;
  }
};

const CardModel = getModelForClass(Card);

export default CardModel;
