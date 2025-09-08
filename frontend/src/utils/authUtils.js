import { setAuthToken } from '../services/api';

export const handleLogout = (navigate) => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('user');
  setAuthToken(null); // clears Axios header
  navigate('/'); // redirect to homepage with login box
};
