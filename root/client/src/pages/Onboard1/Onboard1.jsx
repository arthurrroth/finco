import "./Onboard1.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
// import illustration from "../../icon/Illustration-card.png"
import bankcard from "../../icon/bankcard.png";
import moneyYellow from "../../icon/moneyYellow.png";
import moneyBlue from "../../icon/moneyBlue.png";
import dollarBlue from "../../icon/dollarBlue.png";
import coinBig from "../../icon/coinBig.png";
import coinSmall from "../../icon/coinSmall.png";
import arrow from "../../icon/Line.png";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation.jsx";

const Onboard1 = () => {
  // Loading Animation
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <main className="onboardMain">
          {/* <img  className="onboardIllustration" src={illustration} alt="Money and Card" /># */}
          <div className="illustrationContainer">
            <img className="bankcard" src={bankcard} alt="bankcard" />
            <img className="moneyYellow" src={moneyYellow} alt="money" />
            <img className="dollarBlue" src={dollarBlue} alt="money" />
            <img className="moneyBlue" src={moneyBlue} alt="money" />
            <img className="coinBig" src={coinBig} alt="money" />
            <img className="coinSmall" src={coinSmall} alt="money" />
          </div>
          <h2 className="onboardH2">
            Track your spend <br /> and income
          </h2>
          <p className="onboardText">
           Always keep an eye on your expenses and income, so you can react on problems instantly.
          </p>
          <div className="onboardBtnDiv">
            <NavLink to={"/signUp"} className="skip">
              Skip
            </NavLink>
            <NavLink to={"/onboard2"} className="blueBtnShort">
              Next <img className="onboardArrow" src={arrow} alt="arrow" />
            </NavLink>
          </div>
        </main>
      )}
    </>
  );
};

export default Onboard1;
