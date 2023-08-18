import "./MyWallet.css";
// import methods
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import components
import Nav from "../../components/Nav/Nav";
import OneCard from "../../components/OneCard/OneCard";
import Header from "../../components/Header/Header";
// import context
import { OpenBoxContext } from "../../context/context";

const MyWallet = () => {
  const [cards, setCards] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { openBox, setOpenBox } = useContext(OpenBoxContext);

  //! fetch cards
  useEffect(() => {
    setOpenBox(false);

    const fetchCards = async () => {
      const { data } = await axios.get("/api/wallet/cards");
      setCards(data);
    };
    fetchCards();
  }, [refresh]);

  return (
    <>
      <Header goBack={true} />

      <main className="myWallet-main">
        <section className="cardsList">
          {cards?.map((card) => (
            <OneCard key={card._id} card={card} setRefresh={setRefresh} />
          ))}
        </section>

        <NavLink className="newCard-btn" to="/newcard">
          + new card
        </NavLink>
      </main>

      <Nav />
    </>
  );
};

export default MyWallet;
