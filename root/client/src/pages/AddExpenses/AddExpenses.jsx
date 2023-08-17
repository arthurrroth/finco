import "./AddExpenses.css";

import { useContext, useEffect } from "react";
import { PageContext } from "../../context/context";

import AddTransaction from "../../components/AddTransaction/AddTransaction";

const AddExpenses = () => {
  const { page, setPage } = useContext(PageContext);

  useEffect(() => {
    setPage("expense");
  }, []);

  return (
    <>
      <AddTransaction page={page} />
    </>
  );
};

export default AddExpenses;
