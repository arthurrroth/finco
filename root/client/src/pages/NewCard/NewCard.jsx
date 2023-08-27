import "./NewCard.css";

// import methods
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import components

import Nav from "../../components/Nav/Nav";
import Header from "../../components/Header/Header";
import CardDesign from "../../components/CardDesign/CardDesign";
import { checkAuthentication } from "../../utils/authUtils";

const NewCard = () => {
  const [cardTitle, setCardTitle] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [designColor, setDesignColor] = useState("lightseagreen");
  const [designIndex, setDesignIndex] = useState(0);

  const Navigate = useNavigate();

  //! create new card
  const handleCreate = async (e) => {
    e.preventDefault();
    const userRes = await checkAuthentication();
    const user = userRes.user.data;

    const reqBody = {
      id: user._id
    };
    if (!reqBody.id) {
      return null
    };
    console.log({ reqBody })
    const response = await axios.post('/auth-api/users/acc', reqBody);
    const userAcc = response.data;

    const newCard = {
      cardNumber,
      cardTitle,
      cardDescription,
      cardDesign: designColor,
      spendingLimit: 0,
      selected: false
    };

    await axios.post(`/finco/cards/create/${userAcc._id}`, newCard);

    setCardTitle("");
    setCardNumber("");
    setCardDescription("");

    Navigate("/mywallet");
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
        <CardDesign
          setDesignIndex={setDesignIndex}
          setDesignColor={setDesignColor}
          designIndex={designIndex}
        />

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
