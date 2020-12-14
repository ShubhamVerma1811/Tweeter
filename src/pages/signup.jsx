import Link from "next/link";
import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";

const SignUp = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-blue-800">
      <div className="w-full lg:w-2/4 p-6 pb-0">
        <div className="my-4 py-2">
          <Link href="/">
            <img
              className="cursor-pointer"
              src="/images/logos/tweeter-light.svg"
              alt="logo"
            />
          </Link>
        </div>
        <div className="">
          <AuthForm type="signUp" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
