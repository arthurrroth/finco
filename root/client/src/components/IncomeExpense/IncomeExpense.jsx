import "./IncomeExpense.css";
// import methods
import { useEffect, useState } from "react";

import iconUp from "../../icon/icon-up.svg";
import iconDown from "../../icon/icon-down.svg";

const IncomeExpense = ({ sortAmount, transaction }) => {
  const [income, setIncome] = useState(null);
  const [expenses, setExpenses] = useState(null);

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
  }, [transaction]);

  return (
    <div className="box">
      <img
        src={sortAmount === "income" ? iconUp : iconDown}
        alt="income symbol"
      />
      <div>
        <p className="reportP">{sortAmount === "income" ? "Income" : "Expense"}</p>
        {sortAmount === "income" ? <p className="reportBeginningCurrentP">+ {income} €</p> : <p className="reportBeginningCurrentP">- {expenses} €</p>}
      </div>
    </div>
  );
};

export default IncomeExpense;
