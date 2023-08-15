import "./Nav.css";
import { NavLink } from "react-router-dom";
import HomeIcon from "../../icon/home-icon.png";
import AddIcon from "../../icon/add-icon.png";
import CardIcon from "../../icon/credit-card-icon.png";
import TimeIcon from "../../icon/pie-chart-icon.png";

const Nav = ({page}) => {
 return (
    <>
      <nav className="nav-bottom">
        <div className="nav-container">
        <NavLink 
          to="/" 
          className="nav-link">
          <div className="nav-site">
            {page === "Home"? (<p>Home</p>) :(<img src={HomeIcon} alt="" />)}
          </div>
        </NavLink>
            
        <NavLink 
          to="/transaction" 
          className="nav-link">
          <div className="nav-site">
            {page === "Transaction"? (<p>Transaction</p>) : (<img src={CardIcon} alt="" />)}
          </div>
        </NavLink>
            
        <NavLink 
          to="/addTransaction" 
          className="nav-link">
          <div className="nav-site">
          {page === "Add"? (<p>Add</p>) : (<img src={AddIcon} alt="" />)}
          </div>
        </NavLink>
            
        <NavLink 
          to="/reports" 
          className="nav-link">
          <div className="nav-site">
          {page === "Reports"? (<p>Reports</p>) : (<img src={TimeIcon} alt="" />)}
          </div>
        </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Nav;            