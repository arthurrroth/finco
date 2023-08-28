import logo from "../../icon/Logo.png";

const HeaderSetup = () => {
  return (
    <header className="transactionHeader">
      {/* LOGO */}

      <img className="headerLogo" src={logo} alt="logo" />
    </header>
  );
};

export default HeaderSetup;
