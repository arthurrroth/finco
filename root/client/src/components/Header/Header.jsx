import "./Header.css";

// import methods
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

// import img
import BackIcon from "../../icon/Back-icon.png";
import logo from "../../icon/Logo.png";
import profile from "../../icon/default-profile.png";
import creditCard from "../../icon/credit-card.png";
import { useContext, useEffect, useState } from "react";

// import context
import { SelectedCardContext } from "../../context/context";

const Header = ({ searchIsActive, setSearchIsActive, goBack, welcome }) => {
  const { selectedCard, setSelectedCard } = useContext(SelectedCardContext);

  const [openCardBox, setOpenCardBox] = useState(false);

  const [cards, setCards] = useState([]);
  const [cardTitle, setCardTitle] = useState("");

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedName, setSelectedName] = useState("Name");

  const Navigate = useNavigate();

  const navigateBack = () => {
    Navigate(-1);
  };

  //! fetch Cards & set default card
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/wallet/cards");
      setCards(data);
      setSelectedCard(data[0].cardNumber);
      setCardTitle(data[0].cardTitle);
    };
    fetchData();
  }, []);

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
          <h2>{selectedName}</h2>
        </div>
      ) : (
        <NavLink to={"/"}>
          <img className="headerLogo" src={logo} alt="logo" />
        </NavLink>
      )}

      {/* CARD */}
      <div className="card-profile">
        {selectedCard && (
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
                <>
                  <div className="header-overlay"></div>
                  <div className="cardBox">
                    {cards?.map((card) => (
                      <div className="navCard-list" key={card._id}>
                        <div
                          className="icon-creditCard"
                          onClick={() =>
                            handleSelectCard(card.cardNumber, card.cardTitle)
                          }>
                          <img
                            className="creditCard-mini"
                            src={creditCard}
                            alt="credit-card"
                          />
                          <p>{card.cardTitle}</p>
                        </div>
                        <div className="navCard-separator"></div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </button>
            <p>{cardTitle}</p>
          </div>
        )}

        {/* PROFILE */}
        <NavLink className="profile-img" to={"/account"}>
          {selectedProfile ? (
            <img src="" alt="profile-img" className="selectedProfile-img" />
          ) : (
            <img
              className="defaultProfile-img"
              src={profile}
              alt="default-profile-img"
            />
          )}
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
