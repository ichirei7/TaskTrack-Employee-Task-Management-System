import React, { useState } from 'react';
import API, { setAuthToken } from '../../services/api.js'
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  //login 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      const { token, role, id, name } = res.data;

      //store token and role
      setAuthToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify({ id, name, role }));

      //redirect based on role
      if (role === 'MANAGER'){
        navigate('/manager-dashboard');
      } else if (role === 'EMPLOYEE') {
        navigate('/employee-dashboard');
      } else {
        
        navigate('/unauthorized');
      }

    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form className="login" onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Let's go!</button>
    </form>
  );
}

export default LoginForm;
