import "./ForgotPassword.css";

// import methods
import { useEffect, useState } from "react";
import axios from "axios";

// import components
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorText, setErrorText] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    if (newPassword.length > 0) {
      setErrorText(false);
    }
  }, [newPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      //   const res = await axios.put("/", newPassword);

      Navigate("/login");
    } else {
      setErrorText(true);
      setNewPassword("");
      setConfirmPassword("");
      e.target.reset();
    }
  };

  return (
    <>
      <Header setup={true} />

      <main className="login-main">
        <h2>Reset your password</h2>

        <form onSubmit={handleSubmit} className="setNewPassword-form">
          <section>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              className="login-input"
              placeholder="New password"
              minLength={8}
              required
            />
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="login-input"
              placeholder="Confirm your password"
              minLength={8}
              required
            />
            {errorText && (
              <p className="setPassword-error">Passwords do not match !</p>
            )}
          </section>
          <button type="submit" className="blueBtn-setNewPassword">
            Set new password
          </button>
        </form>
      </main>
    </>
  );
};

export default ForgotPassword;
