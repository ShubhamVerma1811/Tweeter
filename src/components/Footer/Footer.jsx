import React from "react";

const Footer = () => {
  return (
    <div className="text-sm lg:text-base font-poppins font-semibold text-secondary flex flex-col justify-center items-center p-4 mb-16 lg:mb-0">
      <p className="lg:mr-2">
        Made by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline cursor-pointer text-gray-900"
          href="https://shubhamverma.me">
          Shubham Verma
        </a>
      </p>
      <p className="block">Design was inspired by DevChallnges.io</p>
    </div>
  );
};

export default Footer;
