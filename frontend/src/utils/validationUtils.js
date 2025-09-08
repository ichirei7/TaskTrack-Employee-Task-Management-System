export const validateEmail = (email) => {
  if (!email) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email format";
  return null;
};

export const validatePassword = (password, minLength = 6) => {
  if (!password) return "Password is required";
  if (password.length < minLength) return `Password must be at least ${minLength} characters`;
  return null;
};
