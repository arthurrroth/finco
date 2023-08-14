import "./config/index.js";

import express from "express";
import dotenv from "dotenv";

import { cardRouter } from "./card/CardRouter.js";
import { transactionRouter } from "./transaction/TransactionRouter.js";

dotenv.config();

const app = express();
app.use(express.json());

//! test
app.get("/api/status", (req, res) => {
  res.send({ status: "OK" });
});

//! CardRouter
app.use("/api/wallet/cards", cardRouter);

//! TransactionRouter
app.use("/api/wallet/cards/transactions", transactionRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
