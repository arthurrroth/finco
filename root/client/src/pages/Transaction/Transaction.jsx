import "./Transaction.css";
// import methods
import axios from "axios";
import { useContext, useEffect, useState } from "react";
// import components
import Nav from "../../components/Nav/Nav";
import OneTransaction from "../../components/OneTransaction/OneTransaction";
import IncomeExpense from "../../components/IncomeExpense/IncomeExpense";
// import context
import {
  OpenBoxContext,
  PageContext,
  SelectedCardContext,
} from "../../context/context";
// import img
import search from "../../icon/search.png";
import calendar from "../../icon/calendar.png";
import Header from "../../components/Header/Header";

const Transaction = () => {
  const { page, setPage } = useContext(PageContext);
  const { setOpenBox } = useContext(OpenBoxContext);
  const { selectedCard } = useContext(SelectedCardContext);

  const [transactions, setTransactions] = useState([]);
  const [dates, setDates] = useState([]);

  const [searchIsActive, setSearchIsActive] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);
  const [dateTransaction, setDateTransaction] = useState([]);

  //! fetch data
  useEffect(() => {
    setPage("Transaction");
    setOpenBox(false);

    const fetchData = async () => {
      try {

        const reqBody = {
          category: searchInput,
          date: selectedDate,
          selectedCard: selectedCard
        };

        const { data } = await axios.post(`/finco/transactions`, reqBody);

        console.log({ data })

        const sortedData = data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });

        setTransactions(sortedData);
      } catch (error) {
        console.log({ fetchData: error });
      }
    };
    fetchData();
  }, [searchInput, selectedDate, selectedCard]);

  //! set dates for transactions
  useEffect(() => {
    let allDates = [];
    transactions.map((transaction) => {
      allDates.push(transaction.date);
      const sortedDates = [...new Set(allDates)];
      sortedDates.sort((a, b) => b - a);
      setDates(sortedDates);
    });
  }, [transactions]);

  //! search transaction for date
  const handleSearchDate = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    const searchDateTransaction = transactions.filter((transaction) => {
      return transaction.date === date;
    });
    setDateTransaction(searchDateTransaction);
  };

  //! Reset
  const handleReset = () => {
    setSearchIsActive(false);
    setSearchInput("");
    setSelectedDate(null);
    setDateTransaction([]);
  };

  return (
    <>
      <Header
        searchIsActive={searchIsActive}
        setSearchIsActive={setSearchIsActive}
      />

      <main className="main-transaction">
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
            <h2 className="allTransactionsH2">All transaction</h2>
          )}
          <div className="all-transaction-btns">
            <button
              onClick={() => setSearchIsActive(true)}
              className="search-btn">
              <img src={search} alt="search symbol" />
            </button>
            {/* Calendar Btn */}
            {!searchIsActive && (
              <button className="calendar-btn">
                <img src={calendar} alt="calendar symbol" />
                <input
                  onChange={(e) => handleSearchDate(e)}
                  className="date-picker"
                  type="date"
                />
              </button>
            )}
            <button onClick={handleReset}>✕</button>
          </div>
        </article>

        {/* Income & Expense */}
        {!searchIsActive && (
          <article className="income-expense">
            <IncomeExpense sortAmount={"income"} transaction={transactions} />
            <IncomeExpense sortAmount={"expense"} transaction={transactions} />
          </article>
        )}

        {/* Transactions */}
        <section className="transactions">
          {!searchInput && !selectedDate ? (
            dates?.map((date, index) => (
              <div className="dateSectionTransaction" key={index}>
                <p className="weekday">
                  {new Date(date).toLocaleDateString("en-EN", {
                    weekday: "long",
                  })}
                </p>
                <h4 className="transactionBigDate">
                  {date.split("-").reverse().join(".")}
                </h4>
                {transactions?.map(
                  (elm) =>
                    elm.date === date && (
                      <OneTransaction transaction={elm} key={elm._id} />
                    )
                )}
              </div>
            ))
          ) : // selected date
            selectedDate ? (
              <div>
                <p className="weekday">
                  {new Date(selectedDate).toLocaleDateString("en-EN", {
                    weekday: "long",
                  })}
                </p>
                <h4 className="transactionBigDate">
                  {selectedDate.split("-").reverse().join(".")}
                </h4>
                {transactions?.map((elm) => (
                  <OneTransaction transaction={elm} key={elm._id} />
                ))}
              </div>
            ) : (
              // search transactions
              transactions?.map((elm) => (
                <OneTransaction transaction={elm} key={elm._id} />
              ))
            )}
        </section>
      </main>
      <Nav page={page} />
    </>
  );
};

export default Transaction;
