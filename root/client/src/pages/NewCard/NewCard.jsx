import "./NewCard.css";
// import methods
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import components
import Nav from "../../components/Nav/Nav";
// import img
import BackIcon from "../../icon/Back-icon.png";
import grayCircle from "../../icon/grayCircle.png";

const NewCard = () => {
  const [cardTitle, setCardTitle] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDescription, setCardDescription] = useState("");

  const Navigate = useNavigate();

  //! create new card
  const handleCreate = async (e) => {
    e.preventDefault();
    const newCard = {
      cardNumber,
      cardTitle,
      cardDescription,
    };
    const res = await axios.post("/api/wallet/cards/newcard", newCard);

    setCardTitle("");
    setCardNumber("");
    setCardDescription("");

    Navigate("/mywallet");
  };

  return (
    <>
      <header className="addTransactionHeader">
        <button className="goBackBtn">
          <NavLink to="/mywallet">
            <img src={BackIcon} alt="back" />
          </NavLink>
        </button>
        <NavLink to="/account">
          <img src={grayCircle} alt="Profile" />
        </NavLink>
      </header>

      <form onSubmit={handleCreate} className="newCard-form">
        <label name="cardtittle">CardTitle</label>
        <input
          type="text"
          name="cardtittle"
          required
          onChange={(e) => setCardTitle(e.target.value)}
        />
        <label name="cardnumber">Cardnumber</label>
        <input
          type="text"
          name="cardnumber"
          required
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <label name="carddescription">Carddescription</label>
        <input
          type="text"
          name="carddescription"
          required
          onChange={(e) => setCardDescription(e.target.value)}
        />
        <button className="createCard-btn" type="submit">
          create card
        </button>
      </form>

      <Nav />
    </>
  );
};

export default NewCard;
