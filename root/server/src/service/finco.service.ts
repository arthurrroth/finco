import CardModel from "../model/fincoCard.model"
import TransactionModel, { Transaction } from "../model/fincoTx.model";

export const findCardByNumber = (num: string) => {
  return CardModel.findOne({ num })
};

export const createTx = (input: Partial<Transaction>) => {
  return TransactionModel.create(input);
}
