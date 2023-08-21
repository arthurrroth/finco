import "./OneCard.css";
// import methods
import { useState } from "react";
import axios from "axios";
// import img

import EditIcon from "../../icon/pencil-icon.png";
import GroupIcon from "../../icon/Group-Icon.png";
import active from "../../icon/active-icon.png";
import ellipse1 from "../../icon/Ellipse-1.png";
import ellipse2 from "../../icon/Ellipse-2.png";
import Creditcard from "../Creditcard/Creditcard";

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
      <Creditcard card={card} />

      <div className="cardDescription">
        <section className="cardBoxSection">
          <div className="card-box">
            <p className="cardDescriptionHeading">Cardholder</p>
            <h4>Max Müller</h4>
          </div>

          <hr />

          <div className="card-box">
            <p className="cardDescriptionHeading">Cardtitle</p>
            <h4>{card?.cardTitle}</h4>
          </div>

          <hr />

          <div className="card-box">
            <p className="cardDescriptionHeading">Cardnumber</p>
            <h4>{card?.cardNumber}</h4>
          </div>
        </section>

        <div className="card-box">
          <div className="card-box-btn">
            <div>
              <p className="cardDescriptionHeading">Carddescription</p>
              {!editBox ? (
                <h4> {card?.cardDescription}</h4>
              ) : (
                <div className="cardDescriptionEditDiv">
                  <input
                    className="cardDescriptionInput"
                    type="text"
                    placeholder="new description"
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                  <button className="cardEditBtn" onClick={submitEdit}>
                    Edit
                  </button>
                </div>
              )}
            </div>
            <button className="cardEditBtnImg" onClick={handleEdit}>
              <img src={EditIcon} alt="edit icon" />
            </button>
          </div>
        </div>
      </div>

      <button className="cardDeleteBtn" onClick={handleDelete}>
        Delete Card
      </button>
    </article>
  );
};

export default OneCard;
