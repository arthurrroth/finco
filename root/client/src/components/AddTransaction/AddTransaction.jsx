import "./AddTransaction.css";
// import methods
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
// import img
import BackIcon from "../../icon/Back-icon.png";
import selectImg from "../../icon/open-add.png";
import selectDownImg from "../../icon/down.png";

// # delete and change to Profile Picture
import grayCircle from "../../icon/grayCircle.png";
import Header from "../Header/Header";

// # Custom select

// # Functions add income & expenses
// # Connection DB

const AddTransaction = ({ page }) => {
  const [transaction, setTransaction] = useState(null);
  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState("");
  const [category, setCategory] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [transactionType, setTransactionType] = useState("");

  const [refresh, setRefresh] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    setTransactionType(page);

    //! fetch cards
    const fetchData = async () => {
      const { data } = await axios.get("/api/wallet/cards");
      setCards(data);
    };
    fetchData();

    // ! defaultValue: date and time
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    setCurrentDate(`${year}-${month}-${day}`);

    const hours = today.getHours().toString().padStart(2, "0");
    const minutes = today.getMinutes().toString().padStart(2, "0");
    setCurrentTime(`${hours}:${minutes}`);
  }, [page]);

  //! onSubmit function
  const addTransaction = async (e) => {
    e.preventDefault();
    const newTransaction = {
      cardId: selectedCard,
      amount: transaction,
      category,
      transactionType,
      date: currentDate,
      time: currentTime,
    };
    const response = await axios.post(
      "/api/wallet/transactions/newtransaction",
      newTransaction
    );

    setRefresh((prev) => !prev);
    e.target.reset();
    setTransaction(null);
    setCategory("");

    Navigate("/transaction");
  };

  return (
    <>
      <Header goBack={true} />

      <main className="addTransactionMain">
        <h2 className="addTransactionH2">
          <span className="addIncomeExpenseH2">
            Add {page === "Income" ? "income" : "expense"}
          </span>
        </h2>

        {/* ADD TRANSACTION */}
        <form className="addForm" onSubmit={addTransaction}>
          {/* SET CARD */}
          <label className="addLabel" htmlFor="card">
            Card
          </label>
          <div className="addCustomSelect">
            <select
              required
              name="card"
              id="card"
              onChange={(e) => setSelectedCard(e.target.value)}>
              <option selected disabled value="">
                Select your card
              </option>
              {cards?.map((card) => (
                <option key={card._id} value={card.cardNumber}>
                  {card.cardTitle}
                </option>
              ))}
            </select>
            <img src={selectImg} alt="select" />
          </div>
          {/* SET AMOUNT */}
          <label className="addLabel" htmlFor="amount">
            Amount
          </label>
          <input
            required
            className="addInput"
            type="number"
            id="amount"
            placeholder="set your amount €"
            onChange={(e) => setTransaction(e.target.value)}
          />
          {/* SET CATEGORY */}
          <label className="addLabel" htmlFor="category">
            Category
          </label>
          <div className="addCustomSelect">
            {page === "income" ? (
              <select
                required
                name="category"
                id="category"
                onChange={(e) => setCategory(e.target.value)}>
                <option selected disabled value="">
                  Select a category
                </option>
                <option value="sallary">Sallary</option>
                <option value="other income">Other Income</option>
              </select>
            ) : (
              <select
                name="category"
                id="category"
                onChange={(e) => setCategory(e.target.value)}>
                <option selected disabled value="">
                  Select a category
                </option>
                <option value="food & drink">Food & Drink</option>
                <option value="insurance bill">Insurance</option>
                <option value="fitness">Fitness</option>
                <option value="transport & car">Transport & Car</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="bars & restaurants">Bars & Restaurants</option>
                <option value="work expenses">Work Expenses</option>
                <option value="education">Education</option>
                <option value="family & friends">Family & Friends</option>
                <option value="health">Health</option>
                <option value="travel & vacation">Travel & Vacation</option>
                <option value="media & electronics">Media & Electronics</option>
              </select>
            )}

            <img src={selectImg} alt="select" />
          </div>
          {/* SET DATE */}
          <section className="dateTimeSection">
            <div className="dateTimeDiv">
              <label className="addLabel" htmlFor="dateInput">
                Date
              </label>
              <div className="customDateTimeInput">
                <input
                  type="date"
                  id="dateInput"
                  defaultValue={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                />
                <img src={selectDownImg} alt="select" />
              </div>
            </div>
            {/* SET TIME */}
            <div className="dateTimeDiv">
              <label className="addLabel" htmlFor="timeInput">
                Time
              </label>
              <div className="customDateTimeInput">
                <input
                  type="time"
                  id="timeInput"
                  defaultValue={currentTime}
                  onChange={(e) => setCurrentTime(e.target.value)}
                />
                <img src={selectDownImg} alt="select" />
              </div>
            </div>
          </section>
          {/* BUTTON */}
          <button className="blueBtn">
            Add {page === "income" ? "Income" : "Expense"}
          </button>
        </form>
      </main>
    </>
  );
};

export default AddTransaction;
