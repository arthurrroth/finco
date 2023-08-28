import { Request, Response } from "express";
import { CardCreationInput, CardUpdateInput } from "../schema/finco.schema";
import { findAccById } from "../service/user.service";
import CardModel, { Card } from "../model/fincoCard.model";
import log from "../utils/logger";
import { createTx, findCardByNumber } from "../service/finco.service";
import TransactionModel, { Transaction } from "../model/fincoTx.model";

export const createCardHandler = async (
  req: Request<CardCreationInput["params"], {}, CardCreationInput["body"]>,
  res: Response
) => {
  const { accID } = req.params;
  const {
    cardTitle,
    cardNumber,
    cardDescription,
    cardDesign,
    spendingLimit,
    selected,
  } = req.body;

  log.info(accID);

  try {
    const acc = await findAccById(accID);

    log.info("User Account: ", acc);

    if (!acc) {
      return res.status(404).json({ error: "User account not found" });
    }

    const card = new Card(
      acc,
      cardNumber,
      cardTitle,
      cardDescription,
      cardDesign,
      spendingLimit,
      selected
    );
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
    log.info(card);

    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    try {
      const tx = new Transaction(
        card._id,
        amount,
        category,
        transactionType,
        date,
        time
      );
      log.info(tx);
      const acc = await findAccById(card.refUserAcc._id.toString());

      if (!acc) {
        res.status(404).json({ error: "User Account not found" });
      }

      const transaction = await createTx(tx);
      card.transactions.push(transaction);
      card.save();

      return res.send("Transaction successfully added");
    } catch (err) {
      return res.status(500).json({ error: "Failed to create a TX" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCardHandler = async (
  req: Request<CardUpdateInput["params"], {}, CardUpdateInput["body"]>,
  res: Response
) => {
  const { cardNumber, field } = req.params;
  const { value } = req.body;

  try {
    const card = await CardModel.findOne({ cardNumber: cardNumber });

    if (card && field == "title") {
      card.cardTitle = <string>value;
    } else if (card && field == "description") {
      card.cardDescription = <string>value;
    } else if (card && field == "design") {
      card.cardDesign = <string>value;
    } else if (card && field == "spendingLimit") {
      card.spendingLimit = <number>value;
    } else if (card && field == "selected") {
      card.selected = <boolean>value;
    }

    card?.save();

    res.send(card);
  } catch (error: any) {
    log.error(error.message);
    res.status(500).send("Failed to updated card");
  }
};

export const getCardHandler = async (req: Request, res: Response) => {
  const { cardNumber } = req.params;

  try {
    const card = await CardModel.findOne({ cardNumber: cardNumber });
    res.send(card);
  } catch (error: any) {
    log.error(`getCardHandler: ${error.message}`);
    res.status(500).send("getCardHandler failed");
    return false;
  }
};

export const findTxHandler = async (req: Request, res: Response) => {
  const { category, date, selectedCard } = req.body;

  log.info(`${category}, ${date}, ${selectedCard}`);

  const card = await CardModel.findOne({ cardNumber: selectedCard });
  let transactions = await TransactionModel.find();
  log.info(card);
  if (card) {
    transactions.filter((transaction) => {
      return card.transactions.map((cardTx) => {
        cardTx.refCard == transaction.refCard;
      });
    });
  }
  log.info(transactions);
  if (category) {
    transactions = transactions.filter((transaction) => {
      return transaction.category
        .toLowerCase()
        .includes(category.toLowerCase());
    });
  }

  if (date) {
    transactions = transactions.filter((transaction) => {
      return transaction.date === date;
    });
  }
  res.json(transactions);
};

export const findOneTxHandler = async (req: Request, res: Response) => {};

export const deleteCardHandler = async (req: Request, res: Response) => {
  const { cardNumber } = req.params;

  try {
    const card = await CardModel.findOneAndDelete({ cardNumber: cardNumber });
    res.send(`successfully deleted ${card}`);
  } catch (error: any) {
    log.error(`deleteCardHandler: ${error.message}`);
    res.status(500).send("deleteCardHandler failed");
    return false;
  }
};
