import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";

const SignUp = () => {
  return (
    <div className="h-screen flex justify-center">
      <div className=" h-full">
        <img src="/images/logos/tweeter-light.svg" alt="" />
        <div className="m-auto">
          <AuthForm type="signUp" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
