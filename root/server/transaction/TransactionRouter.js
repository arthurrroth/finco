import { Router } from "express";
import { createTransaction } from "./TransactionController.js";
import Transaction from "./TransactionModel.js";

export const transactionRouter = Router();

//! get all transactions
transactionRouter.get("/", async (req, res) => {
  const { category, date, selectedCard } = req.query;
  let transactions = await Transaction.find();
  // find card
  if (selectedCard) {
    transactions = transactions.filter((transaction) => {
      return transaction.cardId === selectedCard;
    });
    // get search transactions
    if (category) {
      transactions = transactions.filter((transaction) => {
        return transaction.category
          .toLowerCase()
          .includes(category.toLowerCase());
      });
      // get transactions by date
    } else if (date) {
      transactions = transactions.filter((transaction) => {
        return transaction.date === date;
      });
    }
  }
  res.json(transactions);
});

//! get one transaction by id
transactionRouter.get("/:id", async (req, res) => {
  const transId = req.params.id;
  try {
    const transaction = await Transaction.findOne({ _id: transId });
    res.json(transaction);
  } catch (error) {
    res.status(400).send("error in finding this transaction");
  }
});

//! create new transaction
transactionRouter.post("/newtransaction", async (req, res) => {
  const { cardId, amount, category, transactionType, date, time } = req.body;
  const newTransaction = await createTransaction(
    cardId,
    amount,
    category,
    transactionType,
    date,
    time
  );
  res.json(newTransaction);
});
