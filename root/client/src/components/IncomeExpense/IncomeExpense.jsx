import "./IncomeExpense.css";

import iconUp from "../../icon/icon-up.png";
import iconDown from "../../icon/icon-down.png";

const IncomeExpense = ({ amount }) => {
  return (
    <div className="box">
      <img src={amount === "income" ? iconUp : iconDown} alt="income symbol" />
      <div>
        <h3>{amount === "income" ? "Income" : "Expense"}</h3>
        <p>{amount === "income" ? "+" : "-"} 34343 €</p>
      </div>
    </div>
  );
};

export default IncomeExpense;
