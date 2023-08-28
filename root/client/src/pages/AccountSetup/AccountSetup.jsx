import "./AccountSetup.css";

// import methods
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// import components
import Header from "../../components/Header/Header";
import CardDesign from "../../components/CardDesign/CardDesign";
import HeaderSetup from "../../components/Header/HeaderSetup";
import { PageContext } from "../../context/context";

const AccountSetup = () => {
  const { page, setPage } = useContext(PageContext)
  const location = useLocation();
  const userID = location.state.userID;
  const [cardTitle, setCardTitle] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [designColor, setDesignColor] = useState("lightseagreen");
  const [designIndex, setDesignIndex] = useState(0);

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`User ID on Account Setup: ${userID}`)

    const reqBody = {
      id: userID
    };

    console.log({ reqBody });
    const response = await axios.post('/auth-api/users/acc', reqBody);
    const userAcc = response.data;

    try {

      const reqBody = {
        cardNumber: cardNumber,
        cardTitle: cardTitle,
        cardDescription: cardDescription,
        cardDesign: designColor,
        selected: true,
      };

      const cardRes = await axios.post(`/finco/cards/create/${userAcc._id}`, reqBody);
      console.log({ cardRes });

    } catch (error) {
      console.log("create the first card", error);
    }

    setPage('account-setup');
    Navigate("/");
  };

  return (
    <>
      <HeaderSetup />

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

// <Header setup={true} />

