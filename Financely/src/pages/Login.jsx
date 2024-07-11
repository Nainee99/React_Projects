import React from "react";
import Header from "../components/Header";
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
