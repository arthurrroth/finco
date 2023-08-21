import "./config/index.js";

import express from "express";
import path from "path";

import { cardRouter } from "./card/CardRouter.js";
import { transactionRouter } from "./transaction/TransactionRouter.js";

const PORT = process.env.PORT;
const ReactAppDistPath = path.join(path.resolve(), "..", "client", "dist");
const ReactAppIndex = path.join(
  path.resolve(),
  "..",
  "client",
  "dist",
  "index.html"
);

const app = express();
app.use(express.json());

app.use(express.static(ReactAppDistPath));

//! test
app.get("/api/status", (req, res) => {
  res.send({ status: "OK" });
});

//! CardRouter
app.use("/api/wallet/cards", cardRouter);

//! TransactionRouter
app.use("/api/wallet/transactions", transactionRouter);

app.get("/*", (req, res) => {
  res.sendFile(ReactAppIndex.pathname);
});

app.listen(PORT, () => {
  console.log(`Server is running faaaast on port ${PORT} 🏎️💨 `);
});
