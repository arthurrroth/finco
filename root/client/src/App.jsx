import "./App.css";
// import methods
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
// import pages
import Onboard1 from "./pages/Onboard1/Onboard1.jsx";
import Onboard2 from "./pages/Onboard2/Onboard2.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Transaction from "./pages/Transaction/Transaction.jsx";
import AddIncome from "./pages/AddIncome/AddIncome.jsx";
import AddExpenses from "./pages/AddExpenses/AddExpenses.jsx";
import Reports from "./pages/Reports/Reports.jsx";
import Account from "./pages/Account/Account.jsx";
import FAQ from "./pages/FAQ/FAQ";
// import context
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
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </BrowserRouter>
        </PageContext.Provider>
      </OpenBoxContext.Provider>
    </>
  );
}

export default App;
