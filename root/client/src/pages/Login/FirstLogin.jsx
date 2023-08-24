import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import "./Login.css";
import { useEffect, useState } from "react";
import axios from "axios";

const FirstLogin = () => {
  const status = useOutletContext();
  const location = useLocation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

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
      navigate('/');

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {

    try {
      setEmail(location.state.email);
    } catch (error) {
      console.log(error);
    };

  }, []);

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
        <button type="submit">Login</button>
      </form>

    </div>);
};

export default FirstLogin;
