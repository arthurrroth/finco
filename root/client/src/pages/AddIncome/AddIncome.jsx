import "./AddIncome.css";

import { useContext, useEffect } from "react";
import { PageContext } from "../../context/context";

import AddTransaction from "../../components/AddTransaction/AddTransaction";

const AddIncome = () => {
  const { page, setPage } = useContext(PageContext);

  useEffect(() => {
    setPage("income");
    document.body.classList.add(page.toLowerCase() + "Page");
    return () => {
      document.body.classList.remove(page.toLowerCase() + "Page");
    };
  }, [page]);

  return (
    <>
      <AddTransaction page={page} />
    </>
  );
};

export default AddIncome;
