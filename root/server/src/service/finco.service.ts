import CardModel from "../model/fincoCard.model"
import TransactionModel, { Transaction } from "../model/fincoTx.model";

export const findCardByNumber = (input: string) => {
  return CardModel.findOne({ cardNumber: input })
};

export const createTx = (input: Transaction) => {
  return TransactionModel.create(input);
}
