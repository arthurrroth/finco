import "./FAQ.css";
// import components
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";

const FAQ = () => {
  return (
    <>
      <Header goBack={true} />

      <main className="FAQ">
        <h1>Frequently Asked Questions (FAQ)</h1>
        <section>
          <h2>1. How do I sign up for an account?</h2>
          <p>
            To sign up for an account, click on the "Sign Up" button on the
            homepage. Fill in the required information, such as your email
            address and password, and follow the prompts to complete the
            registration process.
          </p>
        </section>
        <section>
          <h2>2. How do I add a new card to my account?</h2>
          <p>
            After logging in, navigate to the "Cards" section of your account
            dashboard. Click on the "Add New Card" option, and provide the card
            details, including card number, expiration date, and CVV. Make sure
            to save the changes.
          </p>
        </section>
        <section>
          <h2>3. How do I record a new transaction?</h2>
          <p>
            In the "Transactions" section, click on the "Add New Transaction"
            button. Enter the transaction details, including date, amount,
            description, and select the relevant card. Click "Save" to add the
            transaction to your account.
          </p>
        </section>
        <section>
          <h2>4. Can I categorize my transactions?</h2>
          <p>
            Yes, you can categorize your transactions for better expense
            tracking. While adding or editing a transaction, you'll have the
            option to select a predefined category or create a custom one.
          </p>
        </section>
        <section>
          <h2>5. How can I view my income and expenses on the xy chart?</h2>
          <p>
            Go to the "Charts" or "Analytics" section of your dashboard. Choose
            the XY chart option, select the timeframe you want to analyze, and
            the chart will display your income and expenses based on your
            recorded transactions.
          </p>
        </section>
        <section>
          <h2>6. Can I edit or delete transactions?</h2>
          <p>
            Yes, you can edit or delete transactions. In the "Transactions"
            section, find the transaction you want to modify, and click on the
            "Edit" or "Delete" button, respectively. Confirm your changes when
            prompted.
          </p>
        </section>
        <section>
          <h2>
            7. What security measures are in place to protect my financial data?
          </h2>
          <p>
            We take your data security seriously. We use encryption protocols to
            safeguard your sensitive information, and our servers are regularly
            monitored for any potential vulnerabilities.
          </p>
        </section>
        <section>
          <h2>How do I reset my password if I forget it?</h2>
          <p>
            On the login page, click on the "Forgot Password" link. Follow the
            instructions to reset your password via the email address associated
            with your account.
          </p>
        </section>
        <section>
          <h2>9. Can I access my account from different devices?</h2>
          <p>
            Yes, you can access your account from any device with an internet
            connection. Simply log in using your credentials to manage your
            finances.
          </p>
        </section>
        <section>
          <h2>10. How do I contact customer support?</h2>
          <p>
            For any assistance or queries, you can reach out to our customer
            support team by clicking on the "Contact Us" or "Support" link. You
            can also find our contact information in the footer of the website.
          </p>
        </section>
      </main>

      <Nav />
    </>
  );
};

export default FAQ;
