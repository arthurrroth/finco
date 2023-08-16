import "./Account.css";
import Nav from "../../components/Nav/Nav.jsx"

// Icons
import featherIcon from "../../icon/feather.png"
import notificationIcon from "../../icon/bell-icon.png"
import settingIcon from "../../icon/settings-icon.png"
import faqIcon from "../../icon/help-circle-icon.png"
import logoutIcon from "../../icon/log-out-icon.png"
import openIcon from "../../icon/open.png"

// # delete and change to Profile Picture
import grayCircle from "../../icon/grayCircle.png"


const Account = () => {
  return (
  <>
    <header className="accountHeader">
      <div>
        <p>Welcome back.</p>
        {/* Change to Username from DB */}
        <h3>Name</h3>
      </div>
       {/* Change to Profile Picture from DB */}
      <img src={grayCircle} alt="profilePicture" />
    </header>

    <main className="accountMain">
      <div className="accountOptions">
        <img src={featherIcon} alt="My Wallet" />
        <h5>My Wallet</h5>
        <img src={openIcon} alt="open" />
      </div>

      <section>
        <div className="accountOptions">
          <img src={notificationIcon} alt="Notification" />
          <h5>Notification</h5>
          <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
          </label>
        </div>

        <div className="accountOptions">
          <img src={settingIcon} alt="Settings" />
          <h5>Settings</h5>
          <img src={openIcon} alt="open" />
        </div>
        
        <div className="accountOptions">
          <img src={faqIcon} alt="FAQ" />
          <h5>FAQ</h5>
          <img src={openIcon} alt="open" />
        </div>
      </section>

      <div className="accountOptions">
      <img src={logoutIcon} alt="Logout" />
        <h5>Logout</h5>
        <img src={openIcon} alt="open" />
      </div>

    </main>
    <Nav/>
  </>
  )
};

export default Account;
