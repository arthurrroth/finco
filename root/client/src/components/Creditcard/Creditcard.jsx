import "./Creditcard.css";
// import methods
import { useContext, useEffect, useState } from "react";
import axios from "axios";

// import context
import { SelectedCardContext } from "../../context/context";

// import img
import LogoIcon from "../../icon/Logo-icon.png";
import GroupIcon from "../../icon/Group-icon.png";
import active from "../../icon/active-icon.png";
import ellipse1 from "../../icon/Ellipse-1.png";
import ellipse2 from "../../icon/Ellipse-2.png";

const Creditcard = ({ card }) => {
  const { selectedCard } = useContext(SelectedCardContext);

  const [yourCard, setYourCard] = useState({});
  const [isActive, setIsActive] = useState();

  useEffect(() => {
    if (selectedCard) {
      const fetchData = async () => {
        const card = await axios.get(`/finco/cards/${selectedCard}`);
        setYourCard(card.data);
      };
      fetchData();
    }

    if (card?.cardNumber === selectedCard) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [selectedCard]);

  return (
    <>
      <div
        className="creditcard"
        style={
          card
            ? { backgroundColor: card?.cardDesign }
            : { backgroundColor: yourCard.cardDesign }
        }>
        <img className="ellipse1" src={ellipse1} alt="background" />
        <img className="ellipse2" src={ellipse2} alt="background" />
        <img className="cc-logo" src={LogoIcon} alt="credit card" />
        {isActive && (
          <img className="activeCardImg" src={active} alt="active" />
        )}

        <div className="inner-creditcard">
          {card ? (
            <>
              <p className="creditcardTitle">{card.cardTitle}</p>
              <h5 className="creditcardNumber">
                ****{card?.cardNumber.slice(-3)}
              </h5>
            </>
          ) : (
            <>
              {yourCard && yourCard.cardNumber && (
                <>
                  <p className="creditcardTitle">{yourCard.cardTitle}</p>
                  <h5 className="creditcardNumber">
                    ****{yourCard?.cardNumber.slice(-3)}
                  </h5>
                </>
              )}
            </>
          )}
        </div>
        <div className="bottom-creditcard">
          <img src={GroupIcon} alt="chip" />
          <p>09/25</p>
        </div>
      </div>
    </>
  );
};

export default Creditcard;
