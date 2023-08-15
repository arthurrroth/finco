import Card from "../card/CardModel.js";
import Transaction from "./TransactionModel.js";

//! create new transaction with cardId
export const createTransaction = async (cardId, amount, category) => {
  const card = await Card.findOne({ cardNumber: cardId });
  if (!card) throw new Error("No Card with this Id");

  // create new transaction
  let date = new Date();
  const time = date.toLocaleTimeString();
  date = date.toLocaleDateString();

  const newTransaction = await Transaction.create({
    cardId: card.cardNumber,
    amount,
    category,
    date,
    time,
  });

  // push transaction to card
  await Card.findByIdAndUpdate(
    card._id,
    {
      $push: {
        transactions: newTransaction,
      },
    },
    {
      safe: true,
      upsert: true,
    }
  );
  return newTransaction;
};