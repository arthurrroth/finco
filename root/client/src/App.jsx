import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// 01 Product Tour
import Onboard1 from "./pages/Onboard1/Onboard1.jsx";
import Onboard2 from "./pages/Onboard2/Onboard2.jsx";
// 02 SignIn / SignUp
import SignUp from "./pages/SignUp/SignUp.jsx";
import Login from "./pages/Login/Login.jsx";
// 03 Home
import Home from "./pages/Home/Home.jsx";
// 04 Transaction
import Transaction from "./pages/Transaction/Transaction.jsx";
// 05  Add Transactions
import AddIncome from "./pages/AddIncome/AddIncome.jsx";
import AddExpenses from "./pages/AddExpenses/AddExpenses.jsx";
// 06 Reports
import Reports from "./pages/Reports/Reports.jsx";
// 07 Account/ Menu
import Account from "./pages/Account/Account.jsx";
import { useState } from "react";
import { OpenBoxContext, PageContext } from "../src/context/context.jsx";

function App() {
  const [page, setPage] = useState("");
  const [openBox, setOpenBox] = useState(false);

  return (
    <>
      <OpenBoxContext.Provider value={{ openBox, setOpenBox }}>
        <PageContext.Provider value={{ page, setPage }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/addincome" element={<AddIncome />} />
              <Route path="/addexpenses" element={<AddExpenses />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/account" element={<Account />} />
              <Route path="/onboard1" element={<Onboard1 />} />
              <Route path="/onboard2" element={<Onboard2 />} />
            </Routes>
          </BrowserRouter>
        </PageContext.Provider>
      </OpenBoxContext.Provider>
    </>
  );
}

export default App;
