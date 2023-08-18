import "./AddTransaction.css";

import { useState, useEffect } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import BackIcon from "../../icon/Back-icon.png";
import selectImg from "../../icon/open-add.png";
import selectDownImg from "../../icon/down.png";

// # delete and change to Profile Picture
import grayCircle from "../../icon/grayCircle.png";

// # Custom select

// # Functions add income & expenses
// # Connection DB

const AddTransaction = ({ page }) => {
  const [transaction, setTransaction] = useState(null);
  const [category, setCategory] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [transactionType, setTransactionType] = useState("");

  const [refresh, setRefresh] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    setTransactionType(page);

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
      cardId: "567546783456",
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
      <header className="addTransactionHeader">
        <button className="goBackBtn">
          <NavLink to="/transaction">
            <img src={BackIcon} alt="back" />
          </NavLink>
        </button>
        <NavLink to={"/account"}>
          <img src={grayCircle} alt="Profile" />
        </NavLink>
      </header>

      <main className="addTransactionMain">
        <h2 className="addIncomeH2">
          Add {page === "income" ? "Income" : "Expense"}
        </h2>
        {/* <Creditcard/> */}
        <form className="addForm" onSubmit={addTransaction}>
          <input
            required
            className="addInput"
            type="number"
            id="transaction"
            placeholder="set your amount €"
            onChange={(e) => setTransaction(e.target.value)}
          />

          {/* Category */}
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

          {/* Date */}
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

            {/* Time */}
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

          <button className="blueBtn">
            Add {page === "income" ? "Income" : "Expense"}
          </button>
        </form>
      </main>
    </>
  );
};

export default AddTransaction;