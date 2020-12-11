import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";

const Login = () => {
  return (
    <div className="h-screen flex justify-center">
      <div className=" h-full">
        <img src="/images/logos/tweeter-light.svg" alt="" />
        <div className="m-auto">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
