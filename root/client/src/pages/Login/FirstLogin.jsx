import "./FirstLogin.css";

// import methods
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// import components
import Header from "../../components/Header/Header";

const FirstLogin = () => {

  const location = useLocation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqBody = {
      email: email,
      password: password
    };

    try {

      const login = await axios.post('/auth-api/sessions', reqBody)

      localStorage.setItem('accessToken', login.data.accessToken);
      localStorage.setItem('refreshToken', login.data.refreshToken);

      const currentUser = await axios.get('/auth-api/users/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      const userID = currentUser.data._id;
      console.log({ userID });

      navigate('/account-setup', {
        state: {
          userID: userID,
        }
      });

    } catch (error) {
      console.log("Error on first login:", error);
    }

  };


  useEffect(() => {
    try {
      setEmail(location.state.email);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <main className="firstLogin-main">
        <h1>Login</h1>
        <h3>Put your password for your first login</h3>
        <h4>{email} "Email"</h4>

        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
          <button className="blueBtn" type="submit">
            Login
          </button>
        </form>
      </main>
    </>
  );
};

export default FirstLogin;
