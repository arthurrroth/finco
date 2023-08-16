import "./Reports.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { PageContext } from "../../context/context";
import Nav from "../../components/Nav/Nav";
import ReportDiagram from "../../components/ReportDiagram/ReportDiagram.jsx";
import logo from "../../icon/Logo.png";
import grayCircle from "../../icon/grayCircle.png";
import iconUp from "../../icon/icon-up.png";
import iconDown from "../../icon/icon-down.png";

const Reports = () => {
  const { page, setPage } = useContext(PageContext);

  useEffect(() => {
    setPage("Reports");
  }, []);

  const [loadMore, setLoadMore] = useState(false);

  return (
    <>
      <header className="reportsHeader">
        <NavLink to={"/"}>
          <img className="headerLogo" src={logo} alt="logo" />
        </NavLink>
        <NavLink to={"/account"}>
          <img src={grayCircle} alt="Profile" />
        </NavLink>
      </header>
      <main className="reportMain">
        <h1>Reports</h1>
        <Link to="/">
          {/* <img src={BackIcon} alt="" /> */}
          Back
        </Link>
        <Nav page={page} />

        <section className="beginningCurrentSection">
          <div className="beginningCurrentDiv">
            <img src={iconUp} alt="skala up" />
            <div>
              <p className="reportP">Beginning</p>
              <p className="reportBeginningCurrentP">+ € {/* Add value here */}</p>
            </div>
          </div>

          <div className="beginningCurrentDiv">
            <img src={iconDown} alt="skala down" />
            <div>
              <p className="reportP">Beginning</p>
              <p className="reportBeginningCurrentP">€ {/* Add value here */}</p>
            </div>
          </div>
        </section>

        {/* <ReportDiagram/> */}

        <h4>Total Transactions</h4>

        <button className="loadMoreBtn" onClick={() => setLoadMore(!loadMore)}>
          {loadMore ? "show less" : "load more"}
        </button>
      </main>
    </>
  );
};

export default Reports;

