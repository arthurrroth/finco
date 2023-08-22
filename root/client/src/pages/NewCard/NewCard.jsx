import "./NewCard.css";

// import methods
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import components

import Nav from "../../components/Nav/Nav";
import Header from "../../components/Header/Header";

// import img
import LogoIcon from "../../icon/Logo-icon.png";
import GroupIcon from "../../icon/Group-icon.png";
import ellipse1 from "../../icon/Ellipse-1.png";
import ellipse2 from "../../icon/Ellipse-2.png";

const NewCard = () => {
  const [cardTitle, setCardTitle] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [designColor, setDesignColor] = useState("lightseagreen");
  const [designIndex, setDesignIndex] = useState(0);

  const designs = [
    {
      color: "lightseagreen",
    },
    { color: "lightblue" },
    { color: "lightgray" },
  ];

  const Navigate = useNavigate();

  //! create new card
  const handleCreate = async (e) => {
    e.preventDefault();
    const newCard = {
      cardNumber,
      cardTitle,
      cardDescription,
      cardDesign: designColor,
    };
    const res = await axios.post("/api/wallet/cards/newcard", newCard);

    setCardTitle("");
    setCardNumber("");
    setCardDescription("");

    Navigate("/mywallet");
  };

  //! set card design
  const handleSetDesign = (i) => {
    if (i === 0) {
      setDesignColor(designs[0].color);
      setDesignIndex(0);
    } else if (i === 1) {
      setDesignColor(designs[1].color);
      setDesignIndex(1);
    } else {
      setDesignColor(designs[2].color);
      setDesignIndex(2);
    }
  };
  return (
    <>
      <Header goBack={true} />

      <form onSubmit={handleCreate} className="newCard-form">
        <div className="form-box">
          <label name="cardtittle">Cardtitle</label>
          <input
            className="newCardInput"
            type="text"
            placeholder=" Add Title here"
            name="cardtittle"
            required
            onChange={(e) => setCardTitle(e.target.value)}
          />
          <label name="cardnumber">Cardnumber</label>
          <input
            className="newCardInput"
            type="text"
            placeholder=" Add Number here"
            name="cardnumber"
            required
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <label name="carddescription">Carddescription</label>
          <input
            className="newCardInput"
            type="text"
            placeholder=" Add Description here"
            name="carddescription"
            required
            onChange={(e) => setCardDescription(e.target.value)}
          />
        </div>

        {/* CARD DESIGN */}
        <label name="selectDesign-title">Select your card design</label>
        <div className="selectCard-design">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} onClick={() => handleSetDesign(i)}>
              <div
                className={`
                  new-creditcard ${
                    i === 0
                      ? "firstDesign"
                      : i === 1
                      ? "secondDesign"
                      : "thirdDesign"
                  } ${i === designIndex && "selectedDesign-effect"}
                `}>
                <img className="new-ellipse1" src={ellipse1} alt="background" />
                <img className="new-ellipse2" src={ellipse2} alt="background" />
                <img className="cc-logo" src={LogoIcon} alt="credit card" />
                <div className="inner-creditcard">
                  <p className="creditcardTitle"></p>
                  <h5 className="creditcardNumber"></h5>
                </div>
                <div className="bottom-creditcard">
                  <img src={GroupIcon} alt="chip" />
                  <p>09/25</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="blueBtn" type="submit">
          {" "}
          Create Card
        </button>
      </form>

      <Nav />
    </>
  );
};

export default NewCard;
