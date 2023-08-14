import { Schema, model } from "mongoose";

const TransactionSchema = new Schema({
  cardId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now(),
    expires: 7200,
  },
});

export const Transaction = model("Transaction", TransactionSchema);

export default Transaction;
