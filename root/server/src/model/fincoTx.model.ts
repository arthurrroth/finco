import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
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

export class Transaction {

  @prop({ ref: () => Card, required: false })
  refCard: Ref<Card>;

  @prop({ required: true })
  amount: Number;

  @prop({ enum: Category, required: true })
  category: Category;

  @prop({ required: true })
  transactionType: string;

  @prop({ required: true })
  date: Date;

  @prop({ required: true })
  time: TimeStamps;

};

const TransactionModel = getModelForClass(Transaction);

export default TransactionModel;


