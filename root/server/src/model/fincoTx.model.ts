import { Ref, Severity, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Card } from "./fincoCard.model";
import { Date } from "mongoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

enum Category {
  "food & drink",
  "salary",
  "other income",
  "insurance bill",
  "fitness",
  "transport & car",
  "subscriptions",
  "bars & restaurants",
  "work expenses",
  "education",
  "family & friends",
  "health",
  "travel & vacation",
  "media & electronics",
};

@modelOptions({

  schemaOptions: {
    timestamps: true
  },

  options: {
    allowMixed: Severity.ALLOW
  }
})



export class Transaction {

  @prop({ ref: () => Card, required: false })
  refCard: Ref<Card>;

  @prop({ required: true })
  amount: number;

  @prop({ required: true })
  category: string;

  @prop({ required: true })
  transactionType: string;

  @prop({ required: true })
  date: string;

  @prop({ required: true })
  time: string;

  constructor(card: Ref<Card>, amount: number, category: string, tt: string, date: string, time: string) {
    this.refCard = card._id;
    this.amount = amount;
    this.category = category;
    this.transactionType = tt;
    this.date = date;
    this.time = time;
  }

};

const TransactionModel = getModelForClass(Transaction);

export default TransactionModel;


