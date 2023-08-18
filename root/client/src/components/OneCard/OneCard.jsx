import "./OneCard.css";
// import methods
import { useState } from "react";
import axios from "axios";
// import img
import LogoIcon from "../../icon/Logo-icon.png";
import EditIcon from "../../icon/pencil-icon.png";

const OneCard = ({ card, setRefresh }) => {
  const [editBox, setEditBox] = useState(false);
  const [newdescription, setNewDescription] = useState("");

  //! delete card
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/wallet/cards/${card._id}`);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("delete card failed ", error);
    }
  };

  //! open editBox
  const handleEdit = () => {
    setEditBox((prev) => !prev);
  };

  //! edit description
  const submitEdit = async () => {
    try {
      const newEdit = {
        cardDescription: newdescription,
      };
      const res = await axios.put(`/api/wallet/cards/${card._id}`, newEdit);
      setRefresh((prev) => !prev);
      setEditBox(false);
    } catch (error) {
      console.log("submit edit failed ", error);
    }
  };

  return (
    <article className="oneCard">
      <div className="creditcard">
        <img className="cc-logo" src={LogoIcon} alt="credit card" />
        <div className="inner-creditcard">
          <h3>{card.cardTitle}</h3>
          <p>{card.cardNumber}</p>
        </div>
      </div>
      <div className="cardDescription">
        <div className="card-box">
          <h5>Cardholder</h5>
          <h3>Max Müller</h3>
        </div>
        <div className="card-box">
          <h5>Cardtitle</h5>
          <h3>{card?.cardTitle}</h3>
        </div>
        <div className="card-box">
          <h5>Cardnumber</h5>
          <h3>{card?.cardNumber}</h3>
        </div>
        <div className="card-box">
          <div className="card-box-btn">
            <div>
              <h5>Carddescription</h5>
              {!editBox ? (
                <h3> {card?.cardDescription}</h3>
              ) : (
                <div>
                  <input
                    type="text"
                    placeholder="new description"
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                  <button onClick={submitEdit}> edit</button>
                </div>
              )}
            </div>
            <button onClick={handleEdit}>
              <img src={EditIcon} alt="edit icon" />
            </button>
          </div>
        </div>
      </div>

      <button onClick={handleDelete}>Delete</button>
    </article>
  );
};

export default OneCard;
