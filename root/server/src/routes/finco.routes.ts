import express from "express";
import validateResource from "../middleware/validateResource";
import { cardCreationSchema } from "../schema/finco.schema";
import { createCardHandler, createTransactionHandler } from "../controller/finco.controller";

const fincoRouter = express.Router();

fincoRouter.post(
  '/finco/cards/create/:accId',
  validateResource(cardCreationSchema),
  createCardHandler
);

fincoRouter.post(
  '/finco/transactions/add/:cardNumber',
  createTransactionHandler
)

export default fincoRouter;
