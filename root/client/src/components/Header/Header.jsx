import "./Header.css";
// import methods
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
// import img
import BackIcon from "../../icon/Back-icon.png";
import logo from "../../icon/logo.png";
import profile from "../../icon/grayCircle.png";
import creditCard from "../../icon/credit-card.png";
import { useContext, useEffect, useState } from "react";
// import context
import { SelectedCardContext } from "../../context/context";

const Header = ({ searchIsActive, setSearchIsActive, goBack, welcome }) => {
  const [openCardBox, setOpenCardBox] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardTitle, setCardTitle] = useState("");

  const { selectedCard, setSelectedCard } = useContext(SelectedCardContext);

  const Navigate = useNavigate();

  const navigateBack = () => {
    Navigate(-1);
  };

  //! fetch Cards
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/wallet/cards");
      setCards(data);
    };
    fetchData();
  }, [selectedCard]);

  const handleSelectCard = (id, title) => {
    setSelectedCard(id);
    setCardTitle(title);
  };

  return (
    <header className="transactionHeader">
      {/* LOGO */}
      {searchIsActive ? (
        <button className="goBackBtn" onClick={() => setSearchIsActive(false)}>
          <img src={BackIcon} alt="back icon" />
        </button>
      ) : goBack ? (
        <button className="goBackBtn" onClick={navigateBack}>
          <img src={BackIcon} alt="back" />
        </button>
      ) : welcome ? (
        <div>
          <h5 className="heading">Welcome Back</h5>
          <h2>Name</h2>
        </div>
      ) : (
        <NavLink to={"/"}>
          <img className="headerLogo" src={logo} alt="logo" />
        </NavLink>
      )}

      <div className="card-profile">
        {/* CARD */}
        <div className="card-btn">
          <button
            onClick={() => setOpenCardBox((prev) => !prev)}
            className="btn-hidden">
            <img
              className="creditCard-icon"
              src={creditCard}
              alt="credit card logo"
            />
            {openCardBox && (
              <div className="cardBox">
                {cards?.map((card) => (
                  <button
                    key={card._id}
                    onClick={() => handleSelectCard(card._id, card.cardTitle)}>
                    {card.cardTitle}
                  </button>
                ))}
              </div>
            )}
          </button>
          <p>{cardTitle}</p>
        </div>

        {/* PROFILE */}
        <NavLink to={"/account"}>
          <img src={profile} alt="Profile" />
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
