import Card from "./CardModel.js";
import { Router } from "express";

import { createCard } from "./CardController.js";

export const cardRouter = Router();

//! get all cards
cardRouter.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    res.send(cards);
  } catch (error) {
    res.status(400).send("error in finding all cards");
  }
});

//! get one card by id
cardRouter.get("/:id", async (req, res) => {
  const cardId = req.params.id;
  try {
    const card = await Card.findOne({ cardNumber: cardId });
    res.json(card);
  } catch (error) {
    res.status(400).send("error in finding this card");
  }
});

//! create new card
cardRouter.post("/newcard", async (req, res) => {
  const { userId, cardNumber, cardTitle, cardDescription, cardDesign } =
    req.body;
  const newCard = await createCard(
    // userId,
    cardNumber,
    cardTitle,
    cardDescription,
    cardDesign
  );
  res.send(newCard);
});

//! delete card
cardRouter.delete("/:id", async (req, res) => {
  const cardId = req.params.id;
  try {
    const dbRes = await Card.findByIdAndDelete(cardId);
    res.send("card deleted");
  } catch (error) {
    res.status(400).send("error in deleting card");
  }
});

//! edit existing card
cardRouter.put("/:id", async (req, res) => {
  const reqEdit = req.body;
  const cardId = req.params.id;

  try {
    const dbRes = await Card.findOneAndUpdate({ cardNumber: cardId }, reqEdit, {
      new: true,
    });
    res.json(dbRes);
  } catch (error) {
    res.status(400).send("error in editing card");
  }
});

//! edit all cards
cardRouter.put("/", async (req, res) => {
  const reqEdit = req.body;

  try {
    const dbRes = await Card.updateMany({ selectedCard: true }, reqEdit);
    res.json(dbRes);
  } catch (error) {
    console.log("edit all cards: ", error);
  }
});
