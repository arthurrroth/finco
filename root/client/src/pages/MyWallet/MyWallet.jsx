import "./MyWallet.css";
// import methods
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState} from "react";
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

  const scrollList = (scrollAmount) => {
    const cardsList = document.querySelector(".cardsList");
    cardsList.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const checkScrollPosition = () => {
    const cardsList = document.querySelector(".cardsList");
    const leftPaddle = document.querySelector(".left-paddle");
    const rightPaddle = document.querySelector(".right-paddle");

    if (cardsList.scrollLeft > 0) {
      leftPaddle.classList.remove("hidden");
    } else {
      leftPaddle.classList.add("hidden");
    }

    if (cardsList.scrollLeft < cardsList.scrollWidth - cardsList.clientWidth) {
      rightPaddle.classList.remove("hidden");
    } else {
      rightPaddle.classList.add("hidden");
    }
  };

  useEffect(() => {
    checkScrollPosition();

    const cardsList = document.querySelector(".cardsList");
    cardsList.addEventListener("scroll", checkScrollPosition);

    return () => {
      cardsList.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);


  return (
    <>
      <Header goBack={true} />

      <main className="myWallet-main">
        <ul className="cardsList">
          {cards?.map((card) => (
            <li key={card._id} className="card-block">
              <OneCard card={card} setRefresh={setRefresh} />
            </li>
          ))}
        </ul>

        <div className="paddles">
		      <button className="left-paddle paddle hidden" onClick={() => scrollList(-200)}>⇠</button>
		      <button className="right-paddle paddle" onClick={() => scrollList(200)}>⇢</button>
	      </div>

        <NavLink className="blueBtn" to="/newcard">
          + new card
        </NavLink>
      </main>

      <Nav />
    </>
  );
};

export default MyWallet;