import React, { useEffect, useState } from 'react';
import API from '../services/api';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const HomePage = () => {
  // const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('login'); //default active tab is login
  // useEffect(() => {
  //   API.get('/api/users') // api/users endpoint
  //     .then((res) => setUsers(res.data))
  //     .catch((err) => console.error("Error fetching users:", err));
  // }, []);

  
  return (
    <div>
      <h1>Welcome to TaskTrack</h1>
      <div className='form-wrap'>
          <div className='tabs'>
            <h3 
              className={`login-tab ${activeTab === 'login' ? 'active' : ''}` }
              onClick={() => setActiveTab('login')}
            >
              Login
            </h3>
            <h3 className={`signup-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
            >Sign Up</h3>
          </div> 

          <div className='tabs-content'>
            {activeTab === 'login' && (
              <div id='login-tab-content' className={activeTab === 'login' ? 'active' : ''}>
                 <LoginForm />
                 </div>
            )}
            {activeTab === 'signup' && (
              <div id='signup-tab-content' className={activeTab === 'signup' ? 'active' : ''}>
              <RegisterForm />
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default HomePage;
