import React, { useState } from "react";
import "./style.css";
import Input from "../Input";
import Button from "../Button";

const SignUpSignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign Up on <span style={{ color: "var(--theme)" }}>Financely</span>
      </h2>
      <form>
        <Input
          label={"Full Name"}
          state={name}
          setState={setName}
          placeholder={"Enter Your Name"}
        />
        <Input
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"Enter Your Email"}
        />
        <Input
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"Enter Your Password"}
        />
        <Input
          label={"Confirm Password"}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder={"Re-Enter Your Password"}
        />

        <Button text={"Sign Up Using Email and Password"} />
        <p style={{ textAlign: "center" }}>Or</p>
        <Button text={"Sign Up Using Google"} blue={true} />
      </form>
    </div>
  );
};

export default SignUpSignIn;
