import "./AddTransaction.css";
import { Link } from "react-router-dom";
import BackIcon from "../../icon/Back-icon.png";
import Nav from "../../components/Nav/Nav";
import { useContext, useEffect } from "react";
import { PageContext } from "../../context/context";


const AddTransaction = () => {
  const {page, setPage} = useContext(PageContext)

  useEffect(() => {
    setPage("Add")
  },[]);

  return <>
  <h1>Add Transaction</h1>
  <Link to="/">
      <img src={BackIcon} alt="" />
  </Link>
  <Nav page = {page}/>
  </>;
};

export default AddTransaction;
