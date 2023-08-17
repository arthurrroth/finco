import "./IncomeExpense.css";
// import methods
import { useEffect, useState } from "react";
// import img
import iconUp from "../../icon/icon-up.png";
import iconDown from "../../icon/icon-down.png";

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
        <h3>{sortAmount === "income" ? "Income" : "Expense"}</h3>
        {sortAmount === "income" ? <p>+ {income} €</p> : <p>- {expenses} €</p>}
      </div>
    </div>
  );
};

export default IncomeExpense;
