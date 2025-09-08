import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { validateEmail, validatePassword } from '../../utils/validationUtils';

function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'EMPLOYEE' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // validate form fields 
  const validateForm = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = "Name is required";
    const emailError = validateEmail(form.email); // call from validationUtils
    const passwordError = validatePassword(form.password, 6); // call from validationUtils

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails

    try {
      await authService.register(form);
      alert('Registration successful. Please proceed to login.');
      navigate('/');
    } catch (err) {
      alert('Registration failed. Please check your input or try again.');
    }
  };

  return (
    <form className="login" onSubmit={handleRegister}>
      <h2>Sign Up</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      {errors.name && <small style={{ color: 'red' }}>{errors.name}</small>}

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      {errors.password && <small style={{ color: 'red' }}>{errors.password}</small>}

      <button type="submit">Sign Me Up!</button>
    </form>
  );
}

export default RegisterForm;
