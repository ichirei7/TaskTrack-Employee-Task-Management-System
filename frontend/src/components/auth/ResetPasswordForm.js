import { useState } from 'react';
import authService from '../../services/authService.js';
import { validatePassword } from '../../utils/validationUtils.js';
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordForm() {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!token) return 'Token is required';

    const passwordError = validatePassword(newPassword, 6); // call from validationUtils
    if (passwordError) return passwordError;

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    const validationError = validateForm();

    try {
      const res = await authService.resetPassword(token, newPassword);
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
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={token}
          placeholder="Enter token"
          onChange={(e) => setToken(e.target.value)}
          required
        />
        <input
          type="password"
          value={newPassword}
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && (
         <>
          <p style={{ color: 'green' }}>{message}</p>
          <p><a href="/" style={{ color: 'blue' }}>Return to Homepage</a></p>
         </>
         )}
    </div>
  );
}
