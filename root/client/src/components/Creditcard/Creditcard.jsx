import "./Creditcard.css";
// import img
import LogoIcon from "../../icon/Logo-icon.png";
import GroupIcon from "../../icon/Group-Icon.png";

const Creditcard = ({ card }) => {
  return (
    <div className="creditcard">
      <img className="cc-logo" src={LogoIcon} alt="credit card" />
      <div className="inner-creditcard">
        <h3>{card.cardTitle}</h3>
        <p>{card.cardNumber}</p>
      </div>
      <div className="bottom-creditcard">
        <img src={GroupIcon} alt="" />
        <p>09/25</p>
      </div>
    </div>
  );
};

export default Creditcard;
