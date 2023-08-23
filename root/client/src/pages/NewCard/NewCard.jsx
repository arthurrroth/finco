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

    setCardTitle("");
    setCardNumber("");
    setCardDescription("");

    try {
      const response = await axios.post(`/finco/cards/create/${accId}`, newCard);
      const { card } = response.data;
      console.log('Card created successfully:', card);

      Navigate("/mywallet");
    } catch (error) {
      console.error('Error creating card:', error);
    }
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
        <div>
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

        <button className="blueBtn" type="submit">
          Create Card
        </button>
      </form>

      <Nav />
    </>
  );
};

export default NewCard;
