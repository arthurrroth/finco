import "./Reports.css";
import { Link } from "react-router-dom";
import BackIcon from "../../icon/Back-icon.png";
import Nav from "../../components/Nav/Nav";

const Reports = () => {
  return <>
  <h1>Reports</h1>
  <Link to="/">
      <img src={BackIcon} alt="" />
  </Link>
  <Nav/>
  </>
  ;
};

export default Reports;
