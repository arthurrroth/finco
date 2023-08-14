import "./Onboard2.css";
import { NavLink } from "react-router-dom";
import illustration from "../../icon/Illustration-gift.png"

const Onboard2 = () => {
  return(
    <main>
      <img src={illustration} alt="Gifts and Card" />
      <h2>Analyze yourspending</h2>
      <p>Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt et.</p>
      <NavLink to={"/signUp"}>Get Started</NavLink>
    </main>
  );
};

export default Onboard2;
