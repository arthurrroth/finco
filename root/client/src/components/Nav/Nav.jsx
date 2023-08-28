import "./Nav.css";
import { NavLink } from "react-router-dom";
import HomeIcon from "../../icon/home-icon.png";
import AddIcon from "../../icon/add-icon.png";
import CardIcon from "../../icon/credit-card-icon.png";
import TimeIcon from "../../icon/pie-chart-icon.png";
import { useContext } from "react";
import { OpenBoxContext } from "../../context/context";

const Nav = ({ page }) => {
  const { openBox, setOpenBox } = useContext(OpenBoxContext);

  const handleAddTransaction = () => {
    setOpenBox((prev) => !prev);
  };

  return (
    <>
      <nav className="nav-bottom">
        <div className="nav-container">
          <NavLink to="/home" className="nav-link">
            <div className="nav-site">
              {page === "Home" ? (
                <p>Home</p>
              ) : (
                <img src={HomeIcon} alt="home" />
              )}
            </div>
          </NavLink>

          <NavLink to="/transaction" className="nav-link">
            <div className="nav-site">
              {page === "Transaction" ? (
                <p>Transaction</p>
              ) : (
                <img src={CardIcon} alt="transaction" />
              )}
            </div>
          </NavLink>

          {openBox && (
            <div className="overlay">
              <div className="openbox-addtrans">
                <NavLink to="/addincome" className="links">
                  Income
                </NavLink>
                <hr className="incomeExpensesHR" />
                <NavLink to="/addexpenses" className="links">
                  Expenses
                </NavLink>
              </div>
            </div>
          )}

          <button onClick={handleAddTransaction} className="nav-link">
            {openBox ? <p>Add</p> : <img src={AddIcon} alt="add icon" />}
          </button>

          <NavLink to="/reports" className="nav-link">
            <div className="nav-site">
              {page === "Reports" ? (
                <p>Reports</p>
              ) : (
                <img src={TimeIcon} alt="reports" />
              )}
            </div>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Nav;
