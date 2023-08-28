import "./Reports.css";
// import methods
import { useState } from "react";
import { useContext, useEffect } from "react";
// inport context
import {
  OpenBoxContext,
  PageContext,
  SelectedCardContext,
} from "../../context/context";
// import components
import Nav from "../../components/Nav/Nav";
import Header from "../../components/Header/Header";
import IncomeExpense from "../../components/IncomeExpense/IncomeExpense";
import OneTransaction from "../../components/OneTransaction/OneTransaction";
// import npm packages
import axios from "axios";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Reports = () => {
  const { page, setPage } = useContext(PageContext);
  const { setOpenBox } = useContext(OpenBoxContext);
  const { selectedCard } = useContext(SelectedCardContext);

  const [transactions, setTransactions] = useState([]);
  const [dataForGraph, setDataForGraph] = useState([]);

  const fetchData = async () => {
    try {
      const reqBody = {
        selectedCard: selectedCard
      };

      const { data } = await axios.post(`/finco/transactions`, reqBody);
      console.log({ data })

      const sortedData = data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      setTransactions(sortedData);
      handleDataforGraph(data);
    } catch (error) {
      console.log({ fetchData: error });
    }
  };

  useEffect(() => {
    fetchData()
    console.log({ transactions })
  }, [])

  //! fetch data
  useEffect(() => {
    setPage("Reports");
    setOpenBox(false);


    fetchData();
  }, [selectedCard]);


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
    const sortedFormData = formatData.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    setDataForGraph(sortedFormData);
  };

  return (
    <>
      <Header />

      <main className="reportMain">
        <h2 className="reportHeading">Report</h2>

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
        <h4 className="reportH4">Total Transactions</h4>
        <section className="transactions">
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
