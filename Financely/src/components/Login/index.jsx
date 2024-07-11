import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Input from "../Input";
import Button from "../Button";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../../firebase/Firebase";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const LoginWithEmail = () => {
    setLoading(true);
    console.log("Email :", email);
    console.log("Password :", password);

    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User logged in : ", user);
          toast.success("Login Successful");
          setLoading(false);
          setEmail("");
          setPassword("");
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          toast.error(errorMessage);
          setLoading(false);
        });

      setLoading(false);
    } else {
      toast.error("Enter Email and Password");
      setLoading(false);
    }
  };

  const googleAuth = () => {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("User>>>", user);
          toast.success("Login Successful");
          setLoading(false);
          navigate("/dashboard");

          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log(errorCode, errorMessage, email, credential);
          toast.error(errorMessage);
          setLoading(false);
          // ...
        });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Login to <span style={{ color: "var(--theme)" }}>Financely</span>
      </h2>
      <form>
        <Input
          type="email"
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"Enter Your Email"}
        />
        <Input
          type="password"
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"Enter Your Password"}
        />

        <Button
          disabled={loading}
          text={loading ? "loading...." : "Login Using Email and Password"}
          onClick={LoginWithEmail}
        />
        <p className="p-login">Or</p>
        <Button
          onClick={googleAuth}
          text={loading ? "loading...." : "Login Using Google"}
          blue={true}
        />
        <p className="p-login">
          Don't have an account ?{" "}
          <Link to="/" style={{ textDecoration: "none" }}>
            <span style={{ color: "var(--theme)" }}>Sign Up</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
