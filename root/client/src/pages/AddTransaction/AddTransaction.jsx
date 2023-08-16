import "./AddTransaction.css";
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../icon/Back-icon.png";
import selectImg from "../../icon/open-add.png";
import selectDownImg from "../../icon/down.png";
import Creditcard from "../../components/Creditcard/Creditcard.jsx";

// # delete and change to Profile Picture
import grayCircle from "../../icon/grayCircle.png";

// # Custom select
import { PageContext } from "../../context/context";

// # Functions add income & expenses
// # Connection DB

const AddTransaction = () => {
  const navigate = useNavigate();

  const [showIncome, setShowIncome] = useState(false);
  const [showExpense, setShowExpense] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  // ! defaultValue: date and time
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    setCurrentDate(`${year}-${month}-${day}`);

    const hours = today.getHours().toString().padStart(2, "0");
    const minutes = today.getMinutes().toString().padStart(2, "0");
    setCurrentTime(`${hours}:${minutes}`);
  }, []);

  // ! OnSubmit Functions
  const addIncome = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const response = await axios.post("", formData);

    setRefresh((prev) => !prev);
    e.target.reset();
  };

  const addExpense = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const response = await axios.post("", formData);

    setRefresh((prev) => !prev);
    e.target.reset();
  };

  return (
    <>
      <header className="addTransactionHeader">
        <button className="goBackBtn" onClick={() => navigate(-1)}>
          <img src={BackIcon} alt="back" />
        </button>
        <NavLink to={"/account"}>
          <img src={grayCircle} alt="Profile" />
        </NavLink>
      </header>

      <main className="addTransactionMain">
        <h2 className="addIncomeH2">Add income</h2>
        {/* <Creditcard/> */}
        <form className="addForm" onSubmit={addIncome}>
          <input
            className="addInput"
            type="number"
            id="income"
            placeholder="€ 12000"
          />

          <label className="addLabel" htmlFor="category">
            Category
          </label>
          <div className="addCustomSelect">
            <select name="category" id="category">
              <option value="sallary">Sallary</option>
              {/* <option value="gift">Gift</option> */}
              <option value="othe income">Other Income</option>
            </select>
            <img src={selectImg} alt="select" />
          </div>

          <section className="dateTimeSection">
            <div className="dateTimeDiv">
              <label className="addLabel" htmlFor="dateInput">
                Date
              </label>
              <div className="customDateTimeInput">
                <input type="date" id="dateInput" defaultValue={currentDate} />
                <img src={selectDownImg} alt="select" />
              </div>
            </div>

            <div className="dateTimeDiv">
              <label className="addLabel" htmlFor="timeInput">
                Time
              </label>
              <div className="customDateTimeInput">
                <input type="time" id="timeInput" defaultValue={currentTime} />
                <img src={selectDownImg} alt="select" />
              </div>
            </div>
          </section>

          <button className="blueBtn">Add income</button>
        </form>
      </main>

      <main className="addTransactionMain">
        <h2 className="addExpensesH2">Add expenses</h2>
        {/* <Creditcard/> */}
        <form className="addForm" onSubmit={addExpense}>
          <input
            className="addInput"
            type="number"
            id="expense"
            placeholder="€ 12000"
          />

          <label className="addLabel" htmlFor="category">
            Category
          </label>
          <div className="addCustomSelect">
            <select name="category" id="category">
              <option value="insurance bill">Insurance</option>
              <option value="fitness">Fitness</option>
              <option value="transport & car">Transport & Car</option>
              <option value="subscriptions">Subscriptions</option>
              <option value="bars & restaurants">Bars & Restaurants</option>
              <option value="work expenses">Work Expenses</option>
              <option value="education">Educatione</option>
              <option value="family & friends">Family & Friends</option>
              <option value="health">Health</option>
              <option value="travel & vacation">Travel & Vacation</option>
              <option value="media & electronics">Media & Electronics</option>
            </select>
            <img src={selectImg} alt="select" />
          </div>

          <section className="dateTimeSection">
            <div className="dateTimeDiv">
              <label className="addLabel" htmlFor="dateInput">
                Date
              </label>
              <div className="customDateTimeInput">
                <input type="date" id="dateInput" defaultValue={currentDate} />
                <img src={selectDownImg} alt="select" />
              </div>
            </div>

            <div className="dateTimeDiv">
              <label className="addLabel" htmlFor="timeInput">
                Time
              </label>
              <div className="customDateTimeInput">
                <input type="time" id="timeInput" defaultValue={currentTime} />
                <img src={selectDownImg} alt="select" />
              </div>
            </div>
          </section>

          <button className="blueBtn">Add expenses</button>
        </form>
      </main>
    </>
  );
};

export default AddTransaction;
