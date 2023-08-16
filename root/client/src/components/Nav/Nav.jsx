import "./Nav.css";
import { NavLink } from "react-router-dom";
import HomeIcon from "../../icon/home-icon.png";
import AddIcon from "../../icon/add-icon.png";
import CardIcon from "../../icon/credit-card-icon.png";
import TimeIcon from "../../icon/pie-chart-icon.png";
import { useContext } from "react";
import { OpenBoxContext } from "../../context/context";

import box from "../../icon/Group.png";

const Nav = ({ page }) => {
  const { openBox, setOpenBox } = useContext(OpenBoxContext);

  const handleAddTransaction = () => {
    setOpenBox((prev) => !prev);
  };

  return (
    <>
      <nav className="nav-bottom">
        <div className="nav-container">
          <NavLink to="/" className="nav-link">
            <div className="nav-site">
              {page === "Home" ? <p>Home</p> : <img src={HomeIcon} alt="" />}
            </div>
          </NavLink>

          <NavLink to="/transaction" className="nav-link">
            <div className="nav-site">
              {page === "Transaction" ? (
                <p>Transaction</p>
              ) : (
                <img src={CardIcon} alt="" />
              )}
            </div>
          </NavLink>
          {openBox ? (
            <div className="openbox-addtrans">
              {/* <img src={box} alt="openbox" /> */}
              <NavLink to="/addincome" className="links">
                Income
              </NavLink>
              <NavLink to="/addexpenses" className="links">
                Expenses
              </NavLink>
            </div>
          ) : null}

          <button onClick={handleAddTransaction} className="nav-link">
            {openBox ? <p>Add</p> : <img src={AddIcon} alt="add icon" />}
          </button>

          <NavLink to="/reports" className="nav-link">
            <div className="nav-site">
              {page === "Reports" ? (
                <p>Reports</p>
              ) : (
                <img src={TimeIcon} alt="" />
              )}
            </div>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Nav;
