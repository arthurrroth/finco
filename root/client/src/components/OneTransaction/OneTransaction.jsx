import "./OneTransaction.css";

// import all symbols
import sallary from "../../icon/sallary.png";
import otherIncome from "../../icon/other-income.png";
import foodDrink from "../../icon/food.png";
import insuranceBill from "../../icon/insurance-bill.png";
import fitness from "../../icon/fitness.png";
import transportCar from "../../icon/car.png";
import subscriptions from "../../icon/subscriptions.jpeg";
import barsRestaurants from "../../icon/bar.avif";
import workExpenses from "../../icon/work.png";
import education from "../../icon/education.png";
import familyFriends from "../../icon/family.png";
import health from "../../icon/health.png";
import travelVacation from "../../icon/travel.png";
import mediaElectronics from "../../icon/media.png";

const OneTransaction = ({ transaction }) => {
  return (
    <div className="single-transaction">
      <div className="symbol-category">
        <img
          className="transactionIcon"
          src={
            transaction.category === "food & drink"
              ? foodDrink
              : transaction.category === "sallary"
              ? sallary
              : transaction.category === "other income"
              ? otherIncome
              : transaction.category === "insurance bill"
              ? insuranceBill
              : transaction.category === "fitness"
              ? fitness
              : transaction.category === "transport & car"
              ? transportCar
              : transaction.category === "subscriptions"
              ? subscriptions
              : transaction.category === "bars & restaurants"
              ? barsRestaurants
              : transaction.category === "work expenses"
              ? workExpenses
              : transaction.category === "education"
              ? education
              : transaction.category === "family & friends"
              ? familyFriends
              : transaction.category === "health"
              ? health
              : transaction.category === "travel & vacation"
              ? travelVacation
              : transaction.category === "media & electronics"
              ? mediaElectronics
              : null
          }
          alt="category-symbol"
        />
        <div>
          <p className="transactionCategoryName">{transaction.category}</p>
          <div className="date-time">
            <p className="transactionDate">
              {transaction.date.split("-").reverse().join(".")}
            </p>
            <p className="transactionDate">{transaction.time}</p>
          </div>
        </div>
      </div>
      <p
        className={`amount ${
          transaction.category !== "sallary" &&
          transaction.category !== "other income"
            ? "amountExpense"
            : ""
        }`}>
        {" "}
        {transaction.category === "sallary" ||
        transaction.category === "other income"
          ? "+"
          : "-"}{" "}
        {transaction.amount} €
      </p>
    </div>
  );
};

export default OneTransaction;
