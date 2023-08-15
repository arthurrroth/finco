import "./Nav.css";
import { NavLink } from "react-router-dom";
import HomeIcon from "../../icon/home-icon.png";
import AddIcon from "../../icon/add-icon.png";
import CardIcon from "../../icon/credit-card-icon.png";
import TimeIcon from "../../icon/pie-chart-icon.png";

const Nav = () => {
  return (
    <>
      <nav>
        <NavLink to="/" className="nav-link">
          <div className="nav-site">
            <img src={HomeIcon} alt="" />
            <h5>Home</h5>
          </div>
        </NavLink>
        <NavLink to="/transaction" className="nav-link">
          <div className="nav-site">
            <img src={CardIcon} alt="" />
            <h5>Transaction</h5>
          </div>
        </NavLink>
        <NavLink to="/addTransaction" className="nav-link">
          <div className="nav-site">
            <img src={AddIcon} alt="" />
            <h5>Add</h5>
          </div>
        </NavLink>
        <NavLink to="/reports" className="nav-link">
          <div className="nav-site">
            <img src={TimeIcon} alt="" />
            <h5>Reports</h5>
          </div>
        </NavLink>
      </nav>
    </>
  );
};

export default Nav;