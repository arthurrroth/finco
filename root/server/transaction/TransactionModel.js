import { Schema, model } from "mongoose";

const TransactionSchema = new Schema({
  cardId: {
    type: String,
    required: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "food & drink",
      "sallary",
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
    ],
    required: true,
  },
  transactionType: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

export const Transaction = model("Transaction", TransactionSchema);

export default Transaction;
