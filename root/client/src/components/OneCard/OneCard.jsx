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

  //! delete card
  const handleDelete = async () => {
    if (card.selectedCard) {
      setAlertText(true);
    } else
      try {
        const res = await axios.delete(`/api/wallet/cards/${card._id}`);
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
    setNewDescription("hello");
  };

  //! edit description
  const submitEdit = async () => {
    try {
      const newEdit = {
        cardDescription: newdescription,
      };
      const res = await axios.put(
        `/api/wallet/cards/${card.cardNumber}`,
        newEdit
      );
      console.log(newEdit);
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

        {/* Description */}
        <div className="card-box">
          <div className="card-box-btn">
            <div>
              <p className="cardDescriptionHeading">Description</p>
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
            {editBox ? (
              <button
                onClick={() => setEditBox(false)}
                className="closeEdit-btn">
                X
              </button>
            ) : (
              <button className="cardEditBtnImg" onClick={handleEdit}>
                <img src={EditIcon} alt="edit icon" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* DELETE BTN & DELETE BOX */}
      <button className="cardDeleteBtn" onClick={() => setSureDelete(true)}>
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
