import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", credentials);
      navigate("/login");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className='login'>
      <div className='lContainer'>
        User Name:
        <input
          type='text'
          placeholder='user name'
          id='username'
          onChange={handleChange}
          className='lInput'
        />
        Email:
        <input
          type='email'
          placeholder='email'
          id='email'
          onChange={handleChange}
          className='lInput'
        />
        Password:
        <input
          type='password'
          placeholder='password'
          id='password'
          onChange={handleChange}
          className='lInput'
        />
        <button disabled={loading} onClick={handleClick} className='lButton'>
          Register
        </button>
        <button disabled={loading} onClick={handleLogin} className='lButton'>
          Login to your account
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
