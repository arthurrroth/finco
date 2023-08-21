import "./IncomeExpense.css";
// import methods
import { useEffect, useState } from "react";
// import img
import iconUp from "../../icon/icon-up.svg";
import iconDown from "../../icon/icon-down.svg";

const IncomeExpense = ({ sortAmount, transaction }) => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    let incomeAmount = 0;
    let expenseAmount = 0;

    transaction?.map((elm) => {
      if (elm.amount > 0) {
        if (elm.transactionType === "income") {
          incomeAmount += elm.amount;
        } else {
          expenseAmount += elm.amount;
        }
      }
      setIncome(incomeAmount);

      setExpenses(expenseAmount);
    });
  }, [transaction]);

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
