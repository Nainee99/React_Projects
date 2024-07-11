import React, { useEffect } from "react";
import "./style.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/Firebase";

function Header() {
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  const logoutFunc = () => {
    try {
      signOut(auth)
        .then(() => {
          navigate("/");
          toast.success("Logout Successful");
          // Sign-out successful.
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
          // An error happened.
        });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
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
