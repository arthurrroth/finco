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
import { checkAuthentication } from "../../utils/authUtils";

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
  const [currentUserAcc, setUserAcc] = useState();

  const Navigate = useNavigate();


  const navigateBack = () => {
    Navigate(-1);
  };

  const getCards = async () => {

    const userRes = await checkAuthentication()
    const user = userRes.user.data;
    setSelectedName(user.username);

    const reqBody = {
      id: user._id
    };
    if (!reqBody.id) {
      return null
    };
    const response = await axios.post('/auth-api/users/acc', reqBody);
    const userAcc = response.data;
    setUserAcc(userAcc);

    setCards(userAcc.Wallet);


    Promise.all(cards.map((card) => {
      if (card.selected === true) {
        setSelectedCard(card.cardNumber);
        setFindedCard(card);
      };
    }));

    console.log({ selectedCard });
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        await checkAuthentication();
        await getCards();
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleSelectCard = async (event, id) => {
    event.preventDefault();

    const setFalse = { value: false };
    const setTrue = { value: true };

    let newCards;

    setSelectedCard(id);

    try {

      newCards = await Promise.all(cards.map(async (card) => {

        if (card.cardNumber == id) {
          const updatedCardRes = await axios.put(`/finco/cards/${id}/update/selected/`, setTrue);
          card = updatedCardRes.data;
          setFindedCard(card);
          return card
        };


        if (card.selected === true) {
          const updatedCardRes = await axios.put(`/finco/cards/${card.cardNumber}/update/selected`, setFalse);
          card = updatedCardRes.data;
          setFindedCard(card);
          return card
        }


        return card

      }));

    } catch (error) {
      console.log("Error while changing 'selected' status of cards", error);
    };

    /** try {
       console.log({ newCards })
       setCards(newCards);
       const reqBody = { value: newCards }
       const field = 'wallet';
       const accID = currentUserAcc._id.toString();
  
       console.log({ accID })
 
       const updatedAccRes = await axios.put(`/auth-api/users/acc/${accID}/${field}/`, reqBody);
       console.log({ updatedAccRes })
       const updatedAcc = updatedAccRes?.data;
 
       console.log({ updatedAcc })
 
       setUserAcc(updatedAcc);
     } catch (err) {
       console.log("Error while updating Wallet in User Account when handling selectedCard changes!", err)
     }
 **/
    // Update Wallet with Cards Array and CardModel.Save
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
                        <div className="navCard-list" key={card.cardNumber}>
                          <div
                            className="icon-creditCard"
                            onClick={(e) => handleSelectCard(e, card.cardNumber)}>
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
              <p>{findedCard.cardTitle}</p>
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
