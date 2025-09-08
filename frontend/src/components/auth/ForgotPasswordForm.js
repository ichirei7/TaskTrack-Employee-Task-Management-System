import { useState } from 'react';
import authService from '../../services/authService.js';
import { validateEmail } from '../../utils/validationUtils.js';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const emailError = validateEmail(email); // call from validationUtils
    if (emailError) {
    setError(emailError);
    return;
    }

    try {
      const res = await authService.forgotPassword(email);
      setMessage(typeof res.data === 'string' ? res.data : JSON.stringify(res.data));
    } catch (err) {
      setError(
        err.response?.data
          ? typeof err.response.data === 'string'
            ? err.response.data
            : JSON.stringify(err.response.data)
          : 'Error occurred. Please try again.'
      );
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}
