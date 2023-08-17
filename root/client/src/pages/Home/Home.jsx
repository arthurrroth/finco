import "./Home.css";
import Nav from "../../components/Nav/Nav.jsx";
import { PageContext } from "../../context/context";
import { useContext, useEffect } from "react";
import CircleIcon from "../../icon/grayCircle.png"
import LogoIcon from "../../icon/Logo-icon.png"
import GroupIcon from "../../icon/Group-Icon.png"

const Home = () => {
  const {page, setPage} = useContext(PageContext)

  useEffect(() => {
    setPage("Home")
  
  },[]);

  return (
    <>
    <div className="home-top">
      <h5>Welcome Back</h5>
      <h2>Name</h2>
      <img src={CircleIcon} alt="" />
    </div>
    <div className="creditcard">
      <div className="">
        <img src={LogoIcon} alt="" />
        <h4>Credit Card</h4>
        <p>**** 1289</p>
          <div>
            <img src={GroupIcon} alt="" />
            <p>09/25</p>
          </div>
      </div>
    </div>
    <div className="Wallet">
      <h3>Total Wallet</h3>
    </div>
    <Nav page = {page}/>
    </>
  )

};

export default Home;
