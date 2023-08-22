import "./Home.css";

// import methods
import { useContext, useEffect, useState } from "react";
import axios from "axios";

// import components
import Nav from "../../components/Nav/Nav.jsx";
import IncomeExpense from "../../components/IncomeExpense/IncomeExpense";
import Header from "../../components/Header/Header";
import Creditcard from "../../components/Creditcard/Creditcard";

// import context
import {
  OpenBoxContext,
  PageContext,
  SelectedCardContext,
} from "../../context/context";

// import img
import DangerIcon from "../../icon/icon-danger.svg";
import ThreeDot from "../../icon/threedot-icon.svg";

const Home = () => {
  const { selectedCard, setSelectedCard } = useContext(SelectedCardContext);
  const { page, setPage } = useContext(PageContext);
  const { setOpenBox } = useContext(OpenBoxContext);

  const [yourCard, setYourCard] = useState();
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [limit, setLimit] = useState(0);
  const [editLimit, setEditLimit] = useState(false);

  const handleEditLimit = () => {
    setEditLimit(true);
  };

  const handleSaveLimit = () => {
    setEditLimit(false);
  };

  useEffect(() => {
    setPage("Home");
    setOpenBox(false);

    //! fetch transactions
    const fetchTransactions = async () => {
      try {
        const { data } = await axios.get("./api/wallet/transactions", {
          params: { selectedCard },
        });
        setTransactions(data);
      } catch (error) {
        console.log("fetch transactions: ", error);
      }
    };
    fetchTransactions();
    let incomeAmount = 0;
    let expenseAmount = 0;

    setIncome(incomeAmount);
    setExpenses(expenseAmount);
  }, [selectedCard]);

  return (
    <>
      <Header welcome={true} />

      {selectedCard && <Creditcard />}

      <div className="wallet">
        <h3>Total Wallet</h3>
      </div>
      <article className="income-expense">
        <IncomeExpense sortAmount={"income"} transaction={transactions} />
        <IncomeExpense sortAmount={"expense"} transaction={transactions} />
      </article>
      <article className="monthly-spending">
        <div className="danger-icon">
          <img src={DangerIcon} alt="" />
        </div>
        <div className="limit">
          <p>Monthly spending limit</p>
          {editLimit ? (
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          ) : (
            <h3>${limit}</h3>
          )}
        </div>
        {editLimit ? (
          <button className="save-button" onClick={handleSaveLimit}>
            Save
          </button>
        ) : (
          <img
            src={ThreeDot}
            alt=""
            onClick={handleEditLimit}
            className="edit-icon"
          />
        )}
      </article>
      <Nav page={page} />
    </>
  );
};

export default Home;
