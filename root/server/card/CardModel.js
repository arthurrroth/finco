import { Schema, model } from "mongoose";

const CardSchema = new Schema({
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  cardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  cardTitle: {
    type: String,
    required: true,
    unique: true,
  },
  cardDescription: {
    type: String,
    required: true,
  },
  cardDesign: {
    type: String,
    required: true,
  },
  spendingLimit: {
    type: Number,
    default: 0,
  },
  selectedCard: {
    type: Boolean,
    default: false,
  },
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
});

export const Card = model("Card", CardSchema);

export default Card;
