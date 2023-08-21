import "./Account.css";
// import methods
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
// import components
import Nav from "../../components/Nav/Nav.jsx";
// import context
import { OpenBoxContext } from "../../context/context";
// import img
import featherIcon from "../../icon/feather.png";
import notificationIcon from "../../icon/bell-icon.png";
import settingIcon from "../../icon/settings-icon.png";
import faqIcon from "../../icon/help-circle-icon.png";
import logoutIcon from "../../icon/log-out-icon.png";
import openIcon from "../../icon/open.png";

// # delete and change to Profile Picture
import grayCircle from "../../icon/grayCircle.png";

const Account = () => {
  const { openBox, setOpenBox } = useContext(OpenBoxContext);

  useEffect(() => {
    setOpenBox(false);
  }, []);

  return (
    <>
      <header className="accountHeader">
        <div>
          <p className="accountHeaderP">Welcome back.</p>
          {/* Change to Username from DB */}
          <h3>Name</h3>
        </div>
        {/* Change to Profile Picture from DB */}
        <img src={grayCircle} alt="profilePicture" />
      </header>

      <main className="accountMain">
        <NavLink className="myWalletLink" to="/mywallet">
          <div className="accountOptions">
            <div className="innerOptionDiv">
              <img
                className="accountOptionImg"
                src={featherIcon}
                alt="My Wallet"
              />
              <h5>My Wallet</h5>
            </div>
            <img src={openIcon} alt="open" />
          </div>
        </NavLink>

        <section className="accountOptionsSection">
          <div className="accountOptions2">
            <div className="innerOptionDiv">
              <img
                className="accountOptionImg"
                src={notificationIcon}
                alt="Notification"
              />
              <h5>Notification</h5>
            </div>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>

          <hr />

          <div className="accountOptions2">
            <div className="innerOptionDiv">
              <img
                className="accountOptionImg"
                src={settingIcon}
                alt="Settings"
              />
              <h5>Settings</h5>
            </div>
            <img src={openIcon} alt="open" />
          </div>

          <hr />

          <NavLink className="accountOptions2" to="/faq">
            <div className="innerOptionDiv">
              <img className="accountOptionImg" src={faqIcon} alt="FAQ" />
              <h5>FAQ</h5>
            </div>
            <img src={openIcon} alt="open" />
          </NavLink>
        </section>

        <div className="accountOptions">
          <div className="innerOptionDiv">
            <img className="accountOptionImg" src={logoutIcon} alt="Logout" />
            <h5>Logout</h5>
          </div>
          <img src={openIcon} alt="open" />
        </div>
      </main>
      <Nav />
    </>
  );
};

export default Account;
