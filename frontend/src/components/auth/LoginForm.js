import React, { useState } from 'react';
import { setAuthToken } from '../../services/api.js';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService.js';
import { validateEmail, validatePassword } from '../../utils/validationUtils.js';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // validate form fields
  const validateForm = () => {
    const newErrors = {};
    const emailError = validateEmail(email); // call from validationUtils
    const passwordError = validatePassword(password, 4); // call from validationUtils

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // stop if validation fails

    try {
      
      const { token, role, id, name } = (await authService.login(email, password)).data;

      // store token and role
      setAuthToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify({ id, name, role }));

      // redirect based on role
      if (role === 'MANAGER') navigate('/manager-dashboard');
      else if (role === 'EMPLOYEE') navigate('/employee-dashboard');
      else navigate('/unauthorized');

    } catch (err) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <form className="login" onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {errors.password && <small style={{ color: 'red' }}>{errors.password}</small>}

      <small><Link to="/forgot-password">Forgot Password</Link></small>
      <button type="submit">Let's go!</button>
    </form>
  );
}

export default LoginForm;
