import "./Home.css";
// import methods
import { OpenBoxContext, PageContext } from "../../context/context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import components
import Nav from "../../components/Nav/Nav.jsx";
import IncomeExpense from "../../components/IncomeExpense/IncomeExpense";
import Header from "../../components/Header/Header";
// import img
import CircleIcon from "../../icon/grayCircle.png";
import LogoIcon from "../../icon/Logo-icon.png";
import GroupIcon from "../../icon/Group-Icon.png";

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
      <Header welcome={true} />

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
