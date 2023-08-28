
import "./Account.css";
// import methods
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
import arrowDown from "../../icon/down-arrow.png";
import darkModeIcon from "../../icon/dark-mode.png";

// # delete and change to Profile Picture
import Header from "../../components/Header/Header";

const Account = () => {
  const { openBox, setOpenBox } = useContext(OpenBoxContext);
  const navigate = useNavigate();
  const [settingBox, setSettingBox] = useState(false);
  const [questionLogout, setQuestionLogout] = useState(false);

  useEffect(() => {
    setOpenBox(false);
  }, []);

  const handleLogout = () => {
    localStorage.setItem('accessToken', null);
    localStorage.setItem('refreshToken', null);
    navigate('/login')
  };

  return (
    <>
      <Header welcome={true} />

      <main className="accountMain">
        {/* My Wallet */}
        <NavLink className="text-link" to="/mywallet">
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

        {/* Notification */}
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

          {/* Settings */}
          <div
            onClick={() => setSettingBox((prev) => !prev)}
            className="accountOptions2">
            <div className="innerOptionDiv">
              <img
                className="accountOptionImg"
                src={settingIcon}
                alt="Settings"
              />
              <h5>Settings</h5>
            </div>
            {settingBox ? (
              <img className="arrow-down" src={arrowDown} alt="arrow-down" />
            ) : (
              <img src={openIcon} alt="arrow-open" />
            )}
          </div>
          {/* Setting Box */}
          {settingBox && (
            <div className="accountOptions2">
              <div className="innerOptionDiv">
                <img
                  className="darkMode-icon"
                  src={darkModeIcon}
                  alt="Notification"
                />
                <h5>DarkMode</h5>
              </div>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          )}

          <hr />

          {/* FAQ */}
          <NavLink className="accountOptions2" to="/faq">
            <div className="innerOptionDiv">
              <img className="accountOptionImg" src={faqIcon} alt="FAQ" />
              <h5>FAQ</h5>
            </div>
            <img src={openIcon} alt="open" />
          </NavLink>
        </section>

        {/* Logout */}
        <div
          className="accountOptions"
          onClick={() => setQuestionLogout((prev) => !prev)}>
          <div className="innerOptionDiv">
            <img className="accountOptionImg" src={logoutIcon} alt="Logout" />
            <h5>Logout</h5>
          </div>
          <img src={openIcon} alt="open" />
        </div>

        {questionLogout && (
          <>
            <div className="delete-overlay"></div>
            <div className="questionDelete-box">
              <p>Are you sure you want to logout?</p>
              <div className="deleteBox-btn">
                <button onClick={handleLogout} className="delete-btn">
                  Logout
                </button>

                <button onClick={() => setQuestionLogout(false)}>Cancel</button>
              </div>
            </div>
          </>
        )}
      </main>
      <Nav />
    </>
  );
};

export default Account;

