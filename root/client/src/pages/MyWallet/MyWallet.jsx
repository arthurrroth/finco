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

  useEffect(() => {
    setOpenBox(false);

    //! fetch cards
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
            <div key={card._id} className="card-block">
              <OneCard card={card} setRefresh={setRefresh} />
            </div>
          ))}
        </section>

        <NavLink className="blueBtn" to="/newcard">
          + new card
        </NavLink>
      </main>

      <Nav />
    </>
  );
};

export default MyWallet;
