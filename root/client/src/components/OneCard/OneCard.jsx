import "./OneCard.css";
// import methods
import { useState } from "react";
import axios from "axios";
// import img
import EditIcon from "../../icon/pencil-icon.png";
import Creditcard from "../Creditcard/Creditcard";

const OneCard = ({ cards, card, setRefresh }) => {
  const [editBox, setEditBox] = useState(false);
  const [newdescription, setNewDescription] = useState("");
  const [alertText, setAlertText] = useState(false);
  const [deleteSuccessful, setDeleteSuccessful] = useState(false);
  const [sureDelete, setSureDelete] = useState(false);

  //! open delete box
  const handleQuestionDelete = () => {
    setSureDelete(true);
  };
  console.log(card);

  //! delete card
  const handleDelete = async () => {
    if (card.selectedCard) {
      setAlertText(true);
    } else
      try {
        const res = await axios.delete(`/finco/cards/${card.cardNumber}`);
        setDeleteSuccessful(true);
      } catch (error) {
        console.log("delete card failed ", error);
      }
  };

  //! cancel delte
  const handleCancel = () => {
    setRefresh((prev) => !prev);
    setAlertText(false);
    setSureDelete(false);
    setDeleteSuccessful(false);
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

      {/* DELETE BTN & DELETE BOX */}
      <button className="cardDeleteBtn" onClick={handleQuestionDelete}>
        Delete Card
      </button>

      {sureDelete && (
        <>
          <div className="delete-overlay"></div>
          <div className="questionDelete-box">
            {alertText ? (
              <p className="alert-text">
                You can not delete your selected card!
              </p>
            ) : deleteSuccessful ? (
              <p>Your card was successfully deleted!</p>
            ) : (
              <p>Are you sure you want to delete this card?</p>
            )}
            <div className="deleteBox-btn">
              {!alertText && !deleteSuccessful && (
                <button onClick={handleDelete} className="delete-btn">
                  Delete
                </button>
              )}
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </>
      )}
    </article>
  );
};

export default OneCard;
