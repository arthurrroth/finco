import "./IncomeExpense.css";
// import methods
import { useContext, useEffect, useState } from "react";
// import context
import { SelectedCardContext } from "../../context/context";
// import img
import iconUp from "../../icon/icon-up.svg";
import iconDown from "../../icon/icon-down.svg";

const IncomeExpense = ({ sortAmount, transaction }) => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const { selectedCard } = useContext(SelectedCardContext);

  useEffect(() => {
    let incomeAmount = 0;
    let expenseAmount = 0;

    transaction?.map((elm) => {
      if (elm.transactionType === "income") {
        incomeAmount += elm.amount;
        setIncome(incomeAmount);
      } else {
        expenseAmount += elm.amount;
        setExpenses(expenseAmount);
      }
    });
  }, [transaction, selectedCard]);

  return (
    <div className="box">
      <img
        src={sortAmount === "income" ? iconUp : iconDown}
        alt="income symbol"
      />
      <div>
        <p className="reportP">
          {sortAmount === "income" ? "Income" : "Expense"}
        </p>
        {sortAmount === "income" ? (
          <p className="reportBeginningCurrentP">+ {income} €</p>
        ) : (
          <p className="reportBeginningCurrentP">- {expenses} €</p>
        )}
      </div>
    </div>
  );
};

export default IncomeExpense;
