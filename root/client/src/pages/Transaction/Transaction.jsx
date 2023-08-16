import "./Transaction.css";

import axios from "axios";
import { useContext, useEffect, useState } from "react";

import Nav from "../../components/Nav/Nav";
import OneTransaction from "../../components/OneTransaction/OneTransaction";

// import img
import BackIcon from "../../icon/Back-icon.png";
import logo from "../../icon/logo.png";
import profile from "../../icon/grayCircle.png";
import search from "../../icon/search.png";
import calendar from "../../icon/calendar.png";
import IncomeExpense from "../../components/IncomeExpense/IncomeExpense";
import { PageContext } from "../../context/context";

const Transaction = () => {
const {page, setPage} = useContext(PageContext)

useEffect(() => {
  setPage("Transaction")
},[]);

  const [transactions, setTransactions] = useState([]);
  const [dates, setDates] = useState([]);
  const [income, setIncome] = useState(null);
  const [expense, setExpense] = useState(null);

  const [searchIsActive, setSearchIsActive] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [dateIsActive, setDateIsActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // useEffect(() => {
  //   const date = selectedDate;
  //   const dateFormat = date.replaceAll("-", ".");
  //   console.log(dateFormat);
  // }, [selectedDate]);

  //! fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("./api/wallet/transactions");
        setTransactions(data);
      } catch (error) {
        console.log({ fetchData: error });
      }
    };
    fetchData();
  }, []);

  //! set dates for transactions
  useEffect(() => {
    let allDates = [];
    transactions.map((transaction) => {
      allDates.push(transaction.date);
      allDates.reverse();
      const sortedDates = [...new Set(allDates)];
      setDates(sortedDates);
    });
  }, [transactions]);

  return (
    <>
      <main className="main-transaction">
        {/* Header */}
        <div className="header-transaction">
          {searchIsActive ? (
            <button onClick={() => setSearchIsActive(false)}>
              <img src={BackIcon} alt="back icon" />
            </button>
          ) : (
            <img className="logo-transaction" src={logo} alt="logo" />
          )}

          <img className="profile" src={profile} alt="" />
        </div>

        {/* All transaction */}
        <article className="all-transaction">
          {/* SearchBar */}
          {searchIsActive ? (
            <input
              onChange={(e) => setSearchInput(e.target.value)}
              className="searchbar-transaction"
              type="text"
              placeholder="Search for Transactions"
            />
          ) : (
            <h1>All transaction</h1>
          )}
          <div className="all-transaction-btns">
            <button
              onClick={() => setSearchIsActive(true)}
              className="search-btn">
              <img
                onSelect={(e) => setSelectedDate(e.target.value)}
                src={search}
                alt="search symbol"
              />
            </button>
            {/* Calendar Btn */}
            <button
              onClick={() => setDateIsActive((prev) => !prev)}
              className="calendar-btn">
              <img src={calendar} alt="calendar symbol" />
              <input
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-picker"
                type="date"
              />
            </button>
          </div>
        </article>

        {/* Income & Expense */}
        {searchIsActive ? null : (
          <article className="income-expense">
            <IncomeExpense amount={"income"} />
            <IncomeExpense amount={"expense"} />
          </article>
        )}

        {/* Transactions */}
        {searchIsActive ? (
          <section className="transactions">
            {transactions?.map((elm) => {
              if (
                elm.category.includes(searchInput) &&
                searchInput.length > 0
              ) {
                return <OneTransaction transaction={elm} key={elm._id} />;
              }
            })}
          </section>
        ) : (
          <section className="transactions">
            {dates?.map((date, index) => (
              <div key={index}>
                <h2>{date}</h2>
                {transactions?.map((elm) =>
                  elm.date == date ? (
                    <OneTransaction transaction={elm} key={elm._id} />
                  ) : null
                )}
              </div>
            ))}
          </section>
        )}
      </main>
      <Nav page = {page}/>
    </>
  );
};

export default Transaction;
