import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './Login.module.css';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://67659526410f849996558ecf.mockapi.io/user');
      const userData = await response.json();

      const existingUser = userData.find((user) => user.email === email);

      if (existingUser) {
        if (existingUser.password === password) {
          alert(`Welcome, ${email}`);
          login(); 
          navigate('/'); 
        } else {
          setError('Incorrect password');
        }
      } else {
        setError('Incorrect password or email');
      }
    } catch (error) {
      alert('Error', error);
      setError('Error. Try again');
    }
  };

  return (
    <div className={s.cont1}>
      <div className={s.login}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="button" onClick={handleLogin}>
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
