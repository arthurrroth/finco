import "./AddExpenses.css";

import { useContext, useEffect } from "react";
import { PageContext } from "../../context/context";

import AddTransaction from "../../components/AddTransaction/AddTransaction";

const AddExpenses = () => {
  const { page, setPage } = useContext(PageContext);

  useEffect(() => {
    setPage("expense");
  }, []);

  const pageTitle = "expenses";
  document.body.classList.add(pageTitle.toLowerCase() + "Page");

  return (
    <>
      <AddTransaction page={page} />
    </>
  );
};

export default AddExpenses;
