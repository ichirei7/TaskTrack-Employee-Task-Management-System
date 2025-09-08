import API from './api.js';

const authService = {
  login: (email, password) => API.post('/auth/login', { email, password }),
  register: (form) => API.post('/auth/register', form),

  forgotPassword: (email) =>
    API.post(`/auth/forgot-password?email=${encodeURIComponent(email)}`),

  resetPassword: (token, newPassword) =>
    API.post(
      `/auth/reset-password?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(newPassword)}`
    ),
};

export default authService;
