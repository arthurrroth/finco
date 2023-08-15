import "./Onboard1.css";
import { NavLink } from "react-router-dom";
import illustration from "../../icon/Illustration-card.png"
import arrow from "../../icon/Line.png"
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation.jsx"

const Onboard1 = () => {
  return(
    <main className="onboardMain">
      <img  className="onboardIllustration" src={illustration} alt="Money and Card" />
      <h2 className="onboardH2">Track your spend <br/> and income</h2>
      <p className="onboardText">Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt et.</p>
      <div className="onboardBtnDiv">
        <NavLink to={"/signUp"} className="skip">Skip</NavLink>
        <NavLink to={"/onboard2"} className="blueBtn">Next <img className="onboardArrow" src={arrow} alt="arrow" /></NavLink>
      </div>
    </main>
  ) 
  ;
};

export default Onboard1;
