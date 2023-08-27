import "./AddTransaction.css";
// import methods
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import components
import Header from "../Header/Header";
import CreditCard from "../Creditcard/Creditcard";

// import context
import { SelectedCardContext } from "../../context/context";

// import img
import selectImg from "../../icon/open-add.png";
import selectDownImg from "../../icon/down.png";
import { checkAuthentication } from "../../utils/authUtils";

const AddTransaction = ({ page }) => {
  const { selectedCard, setSelectedCard } = useContext(SelectedCardContext);

  const [transaction, setTransaction] = useState(null);
  const [cards, setCards] = useState([]);

  const [category, setCategory] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [spendingLimit, setSpendingLimit] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const Navigate = useNavigate();

  const fetchLimit = async () => {
    const { data } = await axios.get(`/finco/cards/${selectedCard}`);
    setSpendingLimit(data.spendingLimit);
  };

  const fetchData = async () => {
    const userRes = await checkAuthentication();
    const user = userRes.user.data;

    const reqBody = {
      id: user._id
    };
    if (!reqBody.id) {
      return null
    };

    const response = await axios.post('/auth-api/users/acc', reqBody);
    const userAcc = response.data;
    setCards(userAcc.Wallet);

  };


  useEffect(() => {
    setTransactionType(page);


    fetchLimit();


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
  }, [page, spendingLimit]);

  //! onSubmit function
  const addTransaction = async (e) => {
    e.preventDefault();
    const newTransaction = {
      amount: transaction,
      category,
      transactionType,
      date: currentDate,
      time: currentTime,
    };
    const response = await axios.post(
      `/finco/transactions/add/${selectedCard}`,
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
        <h2
          className={page === "income" ? "incomeHeadline" : "expenseHeadline"}>
          <span className="addIncomeExpenseH2">
            Add {page === "income" ? "Income" : "Expense"}
          </span>
        </h2>

        <CreditCard />

        {/* ADD TRANSACTION */}
        <form className="addForm" onSubmit={addTransaction}>
          {/* SET AMOUNT */}
          <label className="addLabel" htmlFor="amount">
            Amount
          </label>
          {page === "expense" ? (
            <input
              max={spendingLimit > 0 ? spendingLimit : null}
              required
              className="addInput"
              type="number"
              id="amount"
              placeholder="set your amount €"
              onChange={(e) => setTransaction(e.target.value)}
            />
          ) : (
            <input
              required
              className="addInput"
              type="number"
              id="amount"
              placeholder="set your amount €"
              onChange={(e) => setTransaction(e.target.value)}
            />
          )}

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
