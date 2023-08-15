import Transaction from "./TransactionModel.js";
import { Router } from "express";

import { createTransaction } from "./TransactionController.js";

export const transactionRouter = Router();

//! get all transactions
transactionRouter.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(400).send("error in finding all transactions");
  }
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
  const { cardId, amount, category } = req.body;
  const newTransaction = await createTransaction(cardId, amount, category);
  res.json(newTransaction);
});
