import "./Creditcard.css";
// import img
import LogoIcon from "../../icon/Logo-icon.png";
import GroupIcon from "../../icon/Group-Icon.png";
import active from "../../icon/active-icon.png";
import ellipse1 from "../../icon/Ellipse-1.png";
import ellipse2 from "../../icon/Ellipse-2.png";

const Creditcard = ({ card }) => {
  return (
    <div className="creditcard">
      <img className="ellipse1" src={ellipse1} alt="background" />
      <img className="ellipse2" src={ellipse2} alt="background" />
      <img className="cc-logo" src={LogoIcon} alt="credit card" />
      <img className="activeCardImg" src={active} alt="active" />
      <div className="inner-creditcard">
        <p className="creditcardTitle">{card.cardTitle}</p>
        <h5 className="creditcardNumber">{card.cardNumber}</h5>
      </div>
      <div className="bottom-creditcard">
        <img src={GroupIcon} alt="chip" />
        <p>09/25</p>
      </div>
    </div>
  );
};

export default Creditcard;
