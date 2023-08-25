import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import "./Login.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("nux@mail.su");
  const [password, setPassword] = useState('12345678');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqBody = {
      email: email,
      password: password
    };

    try {
      const login = await axios.post('/auth-api/sessions', reqBody)
      console.log({ login });
      localStorage.setItem('accessToken', login.data.accessToken);
      localStorage.setItem('refreshToken', login.data.refreshToken);
      nav("/");
    } catch (error) {
      console.log(error);
    }

  };


  return (
    <div>
      <h1>Login Page</h1>
      <h3>{email}</h3>

      <form onSubmit={handleSubmit}>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <button type="submit">Login</button>
      </form>

    </div>);
};

export default Login;
