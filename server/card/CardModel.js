import { Schema, model } from "mongoose";

const CardSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  cardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  cardTitle: {
    type: String,
    required: true,
  },
  cardDescription: {
    type: String,
    required: true,
  },
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
});

export const Card = model("Card", CardSchema);

export default Card;
