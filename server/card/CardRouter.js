import Card from "./CardModel.js";
import { Router } from "express";

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
    const card = await Card.findOne({ _id: cardId });
    res.json(card);
  } catch (error) {
    res.status(400).send("error in finding this card");
  }
});

//! create new card
cardRouter.post("/newcard", async (req, res) => {
  const { cardNumber, cardTitle, cardDescription } = req.body;
  const newCard = new Card({ cardNumber, cardTitle, cardDescription });
  try {
    await newCard.save();
    res.send({ newCard });
  } catch (error) {
    res.status(400).send("error in creating new card");
  }
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
  const { editTitle, editDescription } = req.body;
  const cardId = req.params.id;
  try {
    const dbRes = await Card.findByIdAndUpdate(
      cardId,
      editTitle,
      editDescription,
      {
        new: true,
      }
    );
    res.json(dbRes);
  } catch (error) {
    res.status(400).send("error in editing card");
  }
});
