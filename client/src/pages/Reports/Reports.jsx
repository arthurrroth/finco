import "./Reports.css";
import { Link } from "react-router-dom";
import BackIcon from "../../icon/Back-icon.png";
import Nav from "../../components/Nav/Nav";
import { useContext, useEffect } from "react";
import { PageContext } from "../../context/context";

const Reports = () => {
  const {page, setPage} = useContext(PageContext)

  useEffect(() => {
    setPage("Reports")
  },[]);

  return <>
  <h1>Reports</h1>
  <Link to="/">
      <img src={BackIcon} alt="" />
  </Link>
  <Nav page = {page}/>
  </>
  ;
};

export default Reports;
