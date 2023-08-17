import "./Onboard1.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import illustration from "../../icon/Illustration-card.png"
import arrow from "../../icon/Line.png"
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation.jsx"

const Onboard1 = () => {

  // Loading Animation
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  }, []);

  return(
    <>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <main className="onboardMain">
          <img  className="onboardIllustration" src={illustration} alt="Money and Card" />
          <h2 className="onboardH2">Track your spend <br/> and income</h2>
          <p className="onboardText">Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt et.</p>
          <div className="onboardBtnDiv">
            <NavLink to={"/signUp"} className="skip">Skip</NavLink>
            <NavLink to={"/onboard2"} className="blueBtnShort">Next <img className="onboardArrow" src={arrow} alt="arrow" /></NavLink>
          </div>
        </main>
      )}
    </>
  ) 
  ;
};

export default Onboard1;
