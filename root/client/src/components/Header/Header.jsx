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

const Header = ({
  searchIsActive,
  setSearchIsActive,
  goBack,
  welcome,
  refresh,
  setup,
}) => {
  const { selectedCard, setSelectedCard } = useContext(SelectedCardContext);

  const [openCardBox, setOpenCardBox] = useState(false);

  const [cards, setCards] = useState([]);
  const [findedCard, setFindedCard] = useState({});

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedName, setSelectedName] = useState("Name");

  const Navigate = useNavigate();

  const navigateBack = () => {
    Navigate(-1);
  };

  //! set first selectedCard
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/wallet/cards");
      setCards(data);

      data.map((card) => {
        if (card.selectedCard === true) {
          setSelectedCard(card.cardNumber);
        }
      });
    };
    fetchData();
  }, [refresh]);

  //! set new selectedCard
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/wallet/cards");

      const findedCard = data.filter(
        (card) => card.cardNumber === selectedCard
      );
      setFindedCard(findedCard);
    };

    fetchData();
  }, [selectedCard]);

  //! handle select card
  const handleSelectCard = async (id) => {
    setSelectedCard(id);

    //! set selectedCard to false
    try {
      const setFalse = {
        selectedCard: false,
      };
      const allToFalse = await axios.put("/api/wallet/cards", setFalse);
    } catch (error) {
      console.log("set all cards to selectedCard: false ", error);
    }

    //! set selectedCard to true
    try {
      const setTrue = {
        selectedCard: true,
      };
      const setSelectTrue = await axios.put(`/api/wallet/cards/${id}`, setTrue);
    } catch (error) {
      console.log("set selectedCard: true ", error);
    }
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
      ) : setup ? (
        <img className="headerLogo" src={logo} alt="logo" />
      ) : (
        <NavLink to={"/"}>
          <img className="headerLogo" src={logo} alt="logo" />
        </NavLink>
      )}

      {/* CARD */}
      {setup ? null : (
        <>
          <div className="card-profile">
            <div className="card-btn">
              <button
                onClick={() => setOpenCardBox((prev) => !prev)}
                className="btn-hidden">
                <img
                  className="creditCard-icon"
                  src={creditCard}
                  alt="credit card logo"
                />
                {/* OpenCard Box */}
                {openCardBox && (
                  <>
                    <div className="header-overlay"></div>
                    <div className="cardBox">
                      {cards?.map((card) => (
                        <div className="navCard-list" key={card._id}>
                          <div
                            className="icon-creditCard"
                            onClick={() => handleSelectCard(card.cardNumber)}>
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
              <p>{findedCard[0]?.cardTitle}</p>
            </div>

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
        </>
      )}
    </header>
  );
};

export default Header;
