import "./Reports.css";
// import methods
import { useState } from "react";
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
// inport context
import { OpenBoxContext, PageContext } from "../../context/context";
// import components
import Nav from "../../components/Nav/Nav";
// import npm packages
import axios from "axios";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
// import img
import logo from "../../icon/Logo.png";
// delete and change to Profile Picture
import grayCircle from "../../icon/grayCircle.png";
import IncomeExpense from "../../components/IncomeExpense/IncomeExpense";
import OneTransaction from "../../components/OneTransaction/OneTransaction";

const Reports = () => {
  const { page, setPage } = useContext(PageContext);
  const { setOpenBox } = useContext(OpenBoxContext);

  const [transactions, setTransactions] = useState([]);
  const [dataForGraph, setDataForGraph] = useState([]);

  //! fetch data
  useEffect(() => {
    setPage("Reports");
    setOpenBox(false);

    const fetchData = async () => {
      try {
        const { data } = await axios.get("./api/wallet/transactions");
        setTransactions(data);
        handleDataforGraph(data);
      } catch (error) {
        console.log({ fetchData: error });
      }
    };
    fetchData();
  }, []);

  //! function for dataForGraph
  const handleDataforGraph = (data) => {
    const formatData = data?.reduce((newArray, transaction) => {
      const findDate = newArray.find((item) => item.date === transaction.date);
      // add to existing Obj
      if (findDate) {
        if (transaction.transactionType === "income") {
          findDate.income += transaction.amount;
        } else if (transaction.transactionType === "expense") {
          findDate.expense += transaction.amount;
        }
        // create new Obj
      } else {
        const newObj = {
          date: transaction.date,
          income:
            transaction.transactionType === "income" ? transaction.amount : 0,
          expense:
            transaction.transactionType === "expense" ? transaction.amount : 0,
        };
        newArray.push(newObj);
      }
      return newArray;
    }, []);
    setDataForGraph(formatData);
  };

  return (
    <>
      {/* HEADER */}
      <header className="reportsHeader">
        <NavLink to={"/"}>
          <img className="headerLogo" src={logo} alt="logo" />
        </NavLink>
        <NavLink to={"/account"}>
          <img src={grayCircle} alt="Profile" />
        </NavLink>
      </header>
      <main className="reportMain">
        <h2>Report</h2>

        {/* INCOME & EXPENSE */}
        <article className="income-expense">
          <IncomeExpense sortAmount={"income"} transaction={transactions} />
          <IncomeExpense sortAmount={"expense"} transaction={transactions} />
        </article>

        {/* XY CHART */}
        <div className="areaChart">
          <AreaChart width={360} height={300} data={dataForGraph}>
            <CartesianGrid></CartesianGrid>
            <XAxis dataKey="date"></XAxis>
            <YAxis></YAxis>
            <Tooltip></Tooltip>
            {/* <Legend></Legend> */}
            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#3CACFE"
              fill="#3CACFE"
            />
            <Area
              type="monotone"
              dataKey="expense"
              name="Expense"
              stroke="#ffba26"
              fill="#ffba26"
            />
          </AreaChart>
        </div>

        {/* TOTAL TRANSACTIONS */}
        <h2>Total Transactions</h2>
        <section className="totalTransactions">
          {transactions?.map((elm) => (
            <OneTransaction key={elm._id} transaction={elm} />
          ))}
        </section>
      </main>

      <Nav page={page} />
    </>
  );
};

export default Reports;
