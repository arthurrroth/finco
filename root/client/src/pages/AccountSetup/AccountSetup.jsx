import "./AccountSetup.css";

// import methods
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import components
import Header from "../../components/Header/Header";
import CardDesign from "../../components/CardDesign/CardDesign";

const AccountSetup = () => {
  const [cardTitle, setCardTitle] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [designColor, setDesignColor] = useState("lightseagreen");
  const [designIndex, setDesignIndex] = useState(0);

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newCard = {
        cardNumber,
        cardTitle,
        cardDescription,
        cardDesign: designColor,
        selectedCard: true,
      };
      const res = await axios.post("/api/wallet/cards/newcard", newCard);
    } catch (error) {
      console.log("create the first card", error);
    }

    try {
      const setTrue = {
        selectedCard: true,
      };
      const setSelectTrue = await axios.put(
        `/api/wallet/cards/${cardNumber}`,
        setTrue
      );
    } catch (error) {
      console.log("set selected card to true", error);
    }

    Navigate("/");
  };

  return (
    <>
      <Header setup={true} />

      <main className="accountSetup-main">
        <h1>Create your first Card</h1>

        <form onSubmit={handleSubmit} className="accountSetup-form">
          <section className="accountSetup-section">
            <input
              className="newCardInput"
              type="text"
              placeholder="Card number"
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            <input
              className="newCardInput"
              type="text"
              placeholder="Card title"
              onChange={(e) => setCardTitle(e.target.value)}
              required
            />
            <input
              className="newCardInput"
              type="text"
              placeholder="Card description"
              onChange={(e) => setCardDescription(e.target.value)}
              required
            />
          </section>
          <CardDesign
            setDesignColor={setDesignColor}
            setDesignIndex={setDesignIndex}
            designIndex={designIndex}
          />
          <button className="blueBtn" type="submit">
            Create Card
          </button>
        </form>
      </main>
    </>
  );
};

export default AccountSetup;
