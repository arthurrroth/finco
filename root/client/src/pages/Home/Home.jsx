import "./Home.css";
import Nav from "../../components/Nav/Nav.jsx";
import { OpenBoxContext, PageContext } from "../../context/context";
import { useContext, useEffect, useState } from "react";
import CircleIcon from "../../icon/grayCircle.png";
import LogoIcon from "../../icon/Logo-icon.png";
import GroupIcon from "../../icon/Group-Icon.png";
import iconUp from "../../icon/icon-up.png";
import iconDown from "../../icon/icon-down.png";
import IncomeExpense from "../../components/IncomeExpense/IncomeExpense";
import axios from "axios";

const Home = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("./api/wallet/transactions");
        setTransactions(data);
      } catch (error) {
        console.log({ fetchData: error });
      }
    };
    let incomeAmount = 0;
    let expenseAmount = 0;

    setIncome(incomeAmount);
    setExpenses(expenseAmount);
  }, []);

  const sortAmount = "income";

  const { page, setPage } = useContext(PageContext);
  const { setOpenBox } = useContext(OpenBoxContext);

  useEffect(() => {
    setPage("Home");
    setOpenBox(false);
  }, []);

  return (
    <>
      <h5 className="heading">Welcome Back</h5>
      <div className="home-top">
        <h2>Name</h2>
        <img src={CircleIcon} alt="" />
      </div>
      <div className="creditcard">
        <img className="cc-logo" src={LogoIcon} alt="" />
        <div className="inner-creditcard">
          <h5>Credit Card</h5>
          <p>**** 1289</p>
        </div>
        <div className="bottom-creditcard">
          <img src={GroupIcon} alt="" />
          <p>09/25</p>
        </div>
      </div>
      <div className="wallet">
        <h3>Total Wallet</h3>
      </div>
      <article className="income-expense">
        <IncomeExpense sortAmount={"income"} transaction={transactions} />
        <IncomeExpense sortAmount={"expense"} transaction={transactions} />
      </article>
      <Nav page={page} />
    </>
  );
};

export default Home;
