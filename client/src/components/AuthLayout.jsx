import React from "react";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
