import React from "react";
import "./style.css";

function Header() {
  const logoutFunc = () => {
    alert("Logout");
  };
  return (
    <div className="navbar">
      <p className="navbar-heading ">Financely.</p>

      <p className="  navbar-link" onClick={logoutFunc}>
        Logout
      </p>
    </div>
  );
}

export default Header;
