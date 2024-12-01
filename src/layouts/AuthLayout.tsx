import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="auth-layout">
      <aside className="auth-sidebar">
        <h1>Your App Name</h1>
        <p>Welcome to the platform. Manage your account effortlessly.</p>
      </aside>
      <main className="auth-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
