import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Input from "../Input";
import Button from "../Button";

import { db } from "../../firebase/Firebase";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../../firebase/Firebase";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const SignUpWithEmail = () => {
    console.log("Name :", name);
    console.log("Email :", email);
    console.log("Password :", password);
    console.log("Confirm Password :", confirmPassword);

    setLoading(true);

    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("User>>>", user);
            toast.success("Sign Up Successful");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            CreateDocs(user);

            navigate("/dashboard");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            toast.error(errorMessage);
            setLoading(false);

            // ..
          });
      } else {
        toast.error("Passwords do not match");
        setLoading(false);
      }
    } else {
      toast.error("Please fill all the fields");
      setLoading(false);
    }
  };

 const CreateDocs = async (user) => {
   if (!user) return;
   const userRef = doc(db, "users", user.uid);
   const userData = await getDoc(userRef);
   if (!userData.exists()) {
     try {
       await setDoc(userRef, {
         name: user.displayName ? user.displayName : name,
         email: user.email,
         photoURL: user.photoURL ? user.photoURL : "",
         createdAt: new Date(),
       });
       toast.success("Doc Created");
       setLoading(false);
     } catch (error) {
       console.log(error);
       toast.error(error.message);
     }
   } else {
     toast.error("User Already Exists");
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
          toast.success("Sign Up Successful");
          setLoading(false);
          navigate("/dashboard");
          CreateDocs(user);

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
        Sign Up on <span style={{ color: "var(--theme)" }}>Financely</span>
      </h2>
      <form>
        <Input
          type="text"
          label={"Full Name"}
          setState={setName}
          state={name}
          placeholder={"Enter Your Name"}
        />
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
        <Input
          type="password"
          label={"Confirm Password"}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder={"Re-Enter Your Password"}
        />

        <Button
          disabled={loading}
          text={loading ? "loading...." : "Sign Up Using Email and Password"}
          onClick={SignUpWithEmail}
        />
        <p className="p-signup">Or</p>
        <Button
          onClick={googleAuth}
          text={loading ? "loading...." : "Sign Up Using Google"}
          blue={true}
        />

        <p className="p-signup">
          Already have an account?
          <Link to="/login" style={{ textDecoration: "none" }}>
            <span style={{ color: "var(--theme)" }}> Login</span>{" "}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
