import express from "express";
import validateResource from "../middleware/validateResource";
import { cardCreationSchema, cardUpdateSchema, txCreationSchema } from "../schema/finco.schema";
import { createCardHandler, createTransactionHandler, getCardHandler, updateCardHandler } from "../controller/finco.controller";

const fincoRouter = express.Router();

fincoRouter.post(
  '/finco/cards/create/:accID',
  validateResource(cardCreationSchema),
  createCardHandler
);

fincoRouter.put(
  '/finco/cards/:cardNumber/update/:field/',
  validateResource(cardUpdateSchema),
  updateCardHandler
);

fincoRouter.get(
  '/finco/cards/:cardNumber',
  getCardHandler
)

fincoRouter.post(
  '/finco/transactions/add/:cardNumber',
  validateResource(txCreationSchema),
  createTransactionHandler
)

export default fincoRouter;
