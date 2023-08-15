import "./Onboard2.css";
import { NavLink } from "react-router-dom";
import illustration from "../../icon/Illustration-gift.png"
import arrow from "../../icon/Line.png"

const Onboard2 = () => {
  return(
    <main className="onboardMain">
      <img className="onboardIllustration" src={illustration} alt="Gifts and Card" />
      <h2 className="onboardH2">Analyze your <br/> spending</h2>
      <p className="onboardText">Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt et.</p>
      <NavLink to={"/signUp"} className="blueBtn">Get Started	<img className="onboardArrow" src={arrow} alt="arrow" /></NavLink>
    </main>
  );
};

export default Onboard2;
