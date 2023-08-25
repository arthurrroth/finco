import "./Login.css";

// import methods
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// import components
import Header from "../../components/Header/Header";

const Login = () => {
  const [email, setEmail] = useState("nux@mail.su");
  const [password, setPassword] = useState("12345678");

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqBody = {
      email: email,
      password: password,
    };

    try {
      const login = await axios.post("/auth-api/sessions", reqBody);
      console.log({ login });
      localStorage.setItem("accessToken", login.data.accessToken);
      localStorage.setItem("refreshToken", login.data.refreshToken);
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleForgotPasswort = async () => {
    const res = await axios.get("/auth-api/users/forgot-password");
  };

  return (
    <>
      <Header setup={true} />

      <main className="login-main">
        <div className="login-header">
          <h1>Welcome back</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            impedit vel nobis recusandae voluptatum.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <section>
            <input
              type="email"
              className="login-input"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="email"
            />
            <input
              type="password"
              className="login-input"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="password"
            />
            <div onClick={handleForgotPasswort} className="forgotPassword-link">
              Forgot your password?
            </div>
          </section>
          <button type="submit" className="blueBtn">
            Login
          </button>
        </form>
        <div className="dontHaveAccount-link">
          <p>Don´t have any account?</p>
          <NavLink to="/signup" className="signUp-link">
            SignUp
          </NavLink>
        </div>
      </main>
    </>
  );
};

export default Login;
