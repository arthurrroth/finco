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
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const [userAcc, setUserAcc] = useState()
  const { selectedCard, setSelectedCard } = useContext(SelectedCardContext);
  const { page, setPage } = useContext(PageContext);
  const { setOpenBox } = useContext(OpenBoxContext);

  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [limit, setLimit] = useState(0);
  const [editLimit, setEditLimit] = useState(false);
  const [cards, setCards] = useState([]);


  const getCards = async () => {

    const userRes = await axios.get('/auth-api/users/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });

    const user = userRes.data;

    const reqBody = {
      id: user._id
    };

    const response = await axios.post('/auth-api/users/acc', reqBody);
    const userAcc = response.data;

    console.log({ userAcc });
    setUserAcc(userAcc);
    setCards(userAcc.Wallet);
    const cardNum = userAcc.Wallet[0].cardNumber;
    setSelectedCard(cardNum);
    console.log("Selected Card: ", userAcc.Wallet[0].cardNumber)

  };


  const handleEditLimit = () => {
    setEditLimit(true);
  };

  //! set spendingLimit on card
  const handleSaveLimit = async (e) => {
    e.preventDefault();
    console.log({ limit })
    const newLimit = { spendingLimit: limit };
    await axios.put(`/finco/cards/${selectedCard}/update/spendingLimit`, newLimit);
    setEditLimit(false);
  };

  useEffect(() => {
    setPage("Home");
    setOpenBox(false);

    console.log(`Home Selected Card: ${selectedCard}`)

    //! fetch spendingLimit
    const fetchLimit = async () => {
      try {
        const card = await axios.get(`/finco/cards/${selectedCard}`)
        setLimit(card.spendingLimit);
      } catch (error) {
        console.log("fetch limit: ", error);
      }
    };
    fetchLimit();

    //! fetch transactions
    const fetchTransactions = async () => {
      console.log({ selectedCard });
      try {
        await getCards()
        cards.map((card) => {
          console.log("getCards called from home:", card.title)
          if (card.cardNumber == selectedCard) {
            setTransactions(card.transactions);
          };
        })
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
          <p>Spending limit</p>
          {editLimit ? (
            <input
              className="setLimit-input"
              type="number"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          ) : (
            <h3>{limit} €</h3>
          )}
        </div>
        {editLimit ? (
          <div className="editLimit-btn">
            <button className="save-button" onClick={handleSaveLimit}>
              Save
            </button>
            <button
              className="limitReset-btn"
              onClick={() => setEditLimit(false)}>
              X
            </button>
          </div>
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
