import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginForm from './components/auth/LoginForm';
import ManagerDashboard from './components/dashboard/ManagerDashboard';
import EmployeeDashboard from './components/dashboard/EmployeeDashboard';
import RegisterForm from './components/auth/RegisterForm';
import { setAuthToken } from './services/api';
import Unauthorized from './pages/Unauthorized';
import NotFoundPage from './pages/NotFoundPage';
import ReportsPage from "./components/dashboard/ReportsPage";
import ForgotPasswordForm from './components/auth/ForgotPasswordForm.js';
import ResetPasswordForm from './components/auth/ResetPasswordForm.js';

const token = localStorage.getItem('token');
setAuthToken(token);

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/login" element={<LoginForm />} />
         <Route path="/register" element={<RegisterForm />} />
         <Route path="/manager-dashboard" element={<ManagerDashboard />} />
         <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
         <Route path="/unauthorized" element={<Unauthorized />} />
         <Route path="/*" element={<NotFoundPage />} />
         <Route path="/manager/reports" element={<ReportsPage />} />
         <Route path="/forgot-password" element={<ForgotPasswordForm />} /> {/*routing for demo*/}
         <Route path="/reset-password" element={<ResetPasswordForm />} /> {/*routing for demo*/}
      </Routes>
      </div>
    </Router>
  );
}

export default App;
