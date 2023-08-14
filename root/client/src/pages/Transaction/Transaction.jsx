import "./Transaction.css";
import { Link } from "react-router-dom";
import BackIcon from "../../icon/Back-icon.png";
import Nav from "../../components/Nav/Nav";

const Transaction = () => {
  return <>
  <h1>Transaction</h1>
  <Link to="/">
      <img src={BackIcon} alt="" />
  </Link>
  <Nav/>
    </>
};

export default Transaction;
