import "./VerifyEmailPage.css";

// import methods
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import the useLocation hook
import axios from "axios";
import Header from "../../components/Header/Header";

const VerifyEmailPage = () => {
  const location = useLocation(); // Get the location object from React Router
  const [verifyCode, setVerifyCode] = useState("");
  const [state, setState] = useState(location.state);
  const [userID, setID] = useState(state.userID);
  const [previewURL, setPreview] = useState(state.previewURL);
  const [email, setEmail] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    try {
      setState(location.state);
      console.log("Received State:", state);
      setID(state.userID);
      setPreview(state.previewURL);
      setEmail(state.email);
      console.log("VerifyUserID: ", userID);
    } catch (error) {
      console.error("Error in VerifyEmailPage:", error);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userID) {
      console.log("VerifyUserID: ", userID);
      const userVerify = await axios.get(
        `/auth-api/users/verify-user/${userID}/${verifyCode}`
      );
      if (userVerify.status === 200) {
        navigate("/first-login", {
          state: {
            email: email,
            userAcc: state.userAcc
          },
        });
      }
      console.log({ userVerify });
    }
  };

  return (
    <>
      <Header setup={true} />

      <div className="verify-box">
        <h1>Verify your Email</h1>
        {previewURL && (
          <a href={previewURL} target="_blank">
            Get your verification code
          </a>
        )}
        <form onSubmit={handleSubmit} className="verify-form">
          <input
            className="login-input"
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value)}
            placeholder="Verification Code"
            required
          />
          <button className="blueBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default VerifyEmailPage;
