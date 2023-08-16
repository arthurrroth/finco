import "./Reports.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Nav from "../../components/Nav/Nav";
<<<<<<< HEAD
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
=======
import ReportDiagram from "../../components/ReportDiagram/ReportDiagram.jsx"
import logo from "../../icon/Logo.png";
import iconUp from "../../icon/Icon up.png"
import iconDown from "../../icon/Icon down.png"

// # delete and change to Profile Picture
import grayCircle from "../../icon/grayCircle.png"

const Reports = () => {

  const [loadMore, setLoadMore] = useState(false);

  return (
  <>
    <header className="reportsHeader">
      <NavLink to={"/"}><img className="headerLogo" src={logo} alt="logo" /></NavLink>
      <NavLink to={"/account"}><img src={grayCircle} alt="Profile" /></NavLink>
    </header>
    <main className="reportMain">
      <h2>Report</h2>

      <section className="beginningCurrentSection">
        <div className="beginningCurrentDiv">
          <img src={iconUp} alt="skala up" />
          <div>
            <p className="reportP">Beginning</p>
            <p className="reportBeginningCurrentP">+ € {}</p>
          </div>
        </div>

        <div className="beginningCurrentDiv">
          <img src={iconDown} alt="skala down" />
          <div>
            <p className="reportP">Beginning</p>
            <p className="reportBeginningCurrentP">€ {}</p>
          </div>
        </div>
      </section>

      {/* <ReportDiagram/> */}

      <h4>Total Transactions</h4>

            
      <button className="loadMoreBtn" onClick={() => setLoadMore(!loadMore)}>{loadMore ? "show less" : "load more"}</button>
    </main>

  <Nav/>
>>>>>>> e8066298ad4676bd1f9d2caa6d1b4fc3eb6e9290
  </>
  )
};

export default Reports;
