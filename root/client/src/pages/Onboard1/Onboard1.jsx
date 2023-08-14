import "./Onboard1.css";
import { NavLink } from "react-router-dom";
import illustration from "../../icon/Illustration-card.png"
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation.jsx"

const Onboard1 = () => {
  return(
    <main>
      <img src={illustration} alt="Money and Card" />
      <h2>Track your spend and income</h2>
      <p>Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt et.</p>
      <NavLink to={"/onboard2"}>Next</NavLink>
    </main>
  ) 
  ;
};

export default Onboard1;
