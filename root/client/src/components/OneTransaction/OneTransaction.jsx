import "./OneTransaction.css";

// import all symbols
import foodDrink from "../../icon/food.png";
import sallary from "../../icon/sallary.png";
import otherIncome from "../../icon/other-income.png";
import insuranceBill from "../../icon/insurance-bill.png";

const OneTransaction = ({ transaction, amount }) => {
  return (
    <div className="single-transaction">
      <div className="symbol-category">
        {/* <img
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
        /> */}
        <div>
          <h1>{transaction.category}</h1>
          <div className="date-time">
            <p>{transaction.date.split("-").reverse().join(".")}</p>
            <p>{transaction.time}</p>
          </div>
        </div>
      </div>
      <p className="amount">
        {" "}
        {transaction.category === "sallary" ||
        transaction.category === "other income"
          ? "+"
          : "-"}{" "}
        € {transaction.amount} €
      </p>
    </div>
  );
};

export default OneTransaction;
