import React from 'react';
import Login from './Login';
import Register from './Register';

const AuthPage = ({ onLoginSuccess }) => {

  const handleLoginSuccess = (user) => {
    onLoginSuccess(user);
  };

  return (
    <div className="relative min-h-screen">
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-6xl p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <Register />
            </div>
            <div className="w-full md:w-1/2">
              <Login onLoginSuccess={handleLoginSuccess} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
