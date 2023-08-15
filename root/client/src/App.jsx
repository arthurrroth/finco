import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"
// 01 Product Tour
import Onboard1 from "./pages/Onboard1/Onboard1.jsx"
import Onboard2 from "./pages/Onboard2/Onboard2.jsx"
// 02 SignIn / SignUp
import SignUp from "./pages/SignUp/SignUp.jsx"
import Login from "./pages/Login/Login.jsx"
// 03 Home
import Home from "./pages/Home/Home.jsx"
// 04 Transaction
import Transaction from "./pages/Transaction/Transaction.jsx"
// 05  Add Transaction
import AddTransaction from "./pages/AddTransaction/AddTransaction.jsx"
// 06 Reports
import Reports from "./pages/Reports/Reports.jsx"
// 07 Account/ Menu
import Account from "./pages/Account/Account.jsx"
import { useState } from "react";
import { PageContext } from "./context/context";


function App() {
  const [page, setPage] = useState("")

  return (
  <>
  <PageContext.Provider value={{page, setPage}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/transaction" element={<Transaction/>}/>
        <Route path="/addTransaction" element={<AddTransaction/>}/>
        <Route path="/reports" element={<Reports/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/onboard1" element={<Onboard1/>}/>
        <Route path="/onboard2" element={<Onboard2/>}/>
      </Routes>
    </BrowserRouter>
  </PageContext.Provider>
  </>
  )
}

export default App;
