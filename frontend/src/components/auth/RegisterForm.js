import React, { useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'EMPLOYEE' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Registration successful. Please proceed to login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form className="login" onSubmit={handleRegister}>
      <h2>Sign Up</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Sign Me Up!</button>
    </form>
  );
}

export default RegisterForm;
