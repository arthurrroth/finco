import { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqBody = {
      username: username,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };

    try {
      const response = await axios.post("/auth-api/users/create-user", reqBody);
      console.log("Preview URL:", response.data.previewURL);
      console.log("UserID:", response.data.userID);

      navigate("/verify-email", {
        state: {
          previewURL: response.data.previewURL,
          userID: response.data.userID,
          email: email,
        },
      });
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="signup-wrapper">
      <article className="signup-heading">
        <h1>
          SignUp to <span>Finco</span>
        </h1>
        <h2>Income & Expense Tracking</h2>
      </article>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <h3>Secure your profile</h3>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <input
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="repeat password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
