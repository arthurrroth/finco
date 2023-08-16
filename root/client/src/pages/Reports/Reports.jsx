import "./Reports.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Nav from "../../components/Nav/Nav";
import { useContext, useEffect } from "react";
import { PageContext } from "../../context/context";
import ReportDiagram from "../../components/ReportDiagram/ReportDiagram.jsx";
import logo from "../../icon/Logo.png";
import iconUp from "../../icon/icon-up.png"
import iconDown from "../../icon/icon-down.png"

// # delete and change to Profile Picture
import grayCircle from "../../icon/grayCircle.png";

const Reports = () => {
  const [loadMore, setLoadMore] = useState(false);
  const { page, setPage } = useContext(PageContext);

  useEffect(() => {
    setPage("Reports");
  }, []);

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

        <button className="loadMoreBtn" onClick={() => setLoadMore(!loadMore)}>
          {loadMore ? "show less" : "load more"}
        </button>
      </main>

      <Nav />
    </>
  );
};

export default Reports;
