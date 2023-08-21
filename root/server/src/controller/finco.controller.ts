
import { Request, Response } from "express";
import { CardCreationInput } from "../schema/finco.schema";
import { findAccById } from "../service/user.service";
import CardModel, { Card } from "../model/fincoCard.model";
import log from "../utils/logger";
import { createTx, findCardByNumber } from "../service/finco.service";
import TransactionModel, { Transaction } from "../model/fincoTx.model";

export const createCardHandler = async (
  req: Request<CardCreationInput['params'], {}, CardCreationInput['body']>,
  res: Response
) => {
  const { accId } = req.params;
  const { cardTitle, cardNumber, cardDescription } = req.body;

  try {
    const acc = await findAccById(accId);

    log.info(acc)

    if (!acc) {
      return res.status(404).json({ error: "User account not found" });
    }

    const card = new Card(acc, cardNumber, cardTitle, cardDescription);
    await CardModel.create(card);

    acc.Wallet.push(card);

    await acc.save();
    return res.status(201).json({ message: "Card created successfully", card });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createTransactionHandler = async (req: Request, res: Response) => {
  const { cardNumber } = req.params;
  const { amount, category, transactionType, date, time } = req.body;

  try {
    const card = await findCardByNumber(cardNumber);

    if (!card) {
      return res.status(404).json({ error: "Card not found" })
    };

    const tx = await createTx({
      refCard: card._id,
      amount: amount,
      category: category,
      transactionType: transactionType,
      date: date,
      time: time,
    });

    card.transactions.push(tx);


  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });

  }
}

