import "./Onboard2.css";
import { NavLink } from "react-router-dom";
// import illustration from "../../icon/Illustration-gift.png"
import arrow from "../../icon/Line.png";
import giftcard from "../../icon/giftcard.png";
import bigGift from "../../icon/bigGift.png";
import mediumGift from "../../icon/mediumGift.png";
import smallGift from "../../icon/smallGift.png";

const Onboard2 = () => {
  return (
    <main className="onboardMain">
      <div className="giftContainer">
        <img className="bigGift" src={bigGift} alt="gift" />
        <img className="mediumGift" src={mediumGift} alt="gift" />
        <img className="smallGift" src={smallGift} alt="gift" />
        <img className="giftcard" src={giftcard} alt="giftcard" />
      </div>
      {/* <img className="onboardIllustration" src={illustration} alt="Gifts and Giftcard" /> */}
      <h2 className="onboardH2">
        Analyze your <br /> spending
      </h2>
      <p className="onboardText">
       Perfect your finances to see even better where more money can be saved in the future.
      </p>
      <NavLink to={"/signUp"} className="blueBtn">
        Get Started <img className="onboardArrow" src={arrow} alt="arrow" />
      </NavLink>
    </main>
  );
};

export default Onboard2;
