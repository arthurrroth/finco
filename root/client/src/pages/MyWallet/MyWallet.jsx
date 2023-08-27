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
import { checkAuthentication } from "../../utils/authUtils";

const MyWallet = () => {
  const [cards, setCards] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { openBox, setOpenBox } = useContext(OpenBoxContext);

  const getCards = async () => {

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

    console.log({ userAcc });
    setCards(userAcc.Wallet);
  };


  useEffect(() => {
    setOpenBox(false);

    //! fetch cards
    const fetchCards = async () => {
      await getCards();
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
            <li key={card.cardNumber} className="card-block">
              <OneCard cards={cards} card={card} setRefresh={setRefresh} />
            </li>
          ))}
        </ul>

        <div className="paddles">
          <button
            className="left-paddle paddle hidden"
            onClick={() => scrollList(-200)}>
            ⇠
          </button>
          <button
            className="right-paddle paddle"
            onClick={() => scrollList(200)}>
            ⇢
          </button>
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
