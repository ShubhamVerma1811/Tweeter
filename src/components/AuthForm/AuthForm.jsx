import Link from "next/link";
import { useState } from "react";
import { handleSignIn, handleSignUp } from "../../services/Authentication";

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);

  const signIn = () => (
    <div>
      <div className="mb-4 bg-blue-900">
        <label
          className="block text-primary text-sm font-bold p-4"
          htmlFor="Email">
          Email
          <input
            className="
            bg-blue-900
            py-4
            font-poppins
            shadow appearance-none rounded w-full text-white placeholder-blue-300 leading-tight"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-6">
        <div className="mb-4 bg-blue-900">
          <label
            className="block text-primary text-sm font-bold p-4"
            htmlFor="password">
            Password
            <input
              className="
            bg-blue-900
            py-4
            font-poppins
            shadow appearance-none rounded w-full text-white placeholder-blue-300 leading-tight"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center">
        <button
          onClick={() => {
            handleSignIn(email, password);
          }}
          className="bg-primary hover:bg-primary text-white font-bold py-4 px-8 rounded focus:outline-none focus:shadow-outline"
          type="button">
          Sign In
        </button>
        <div className="py-4 mr-0 ml-auto">
          <Link href="/signup">
            <a className="font-noto text-primary font-semibold">
              Create an account?
            </a>
          </Link>
        </div>
      </div>
    </div>
  );

  const signUp = () => (
    <div>
      <form>
        <div className="mb-4">
          <div className="mb-4 bg-blue-900">
            <label
              className="block text-primary text-sm font-bold p-4"
              htmlFor="name">
              Name
              <input
                className="
              bg-blue-900
              py-4
              font-poppins
              shadow appearance-none rounded w-full text-white placeholder-blue-300 leading-tight"
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-4 bg-blue-900">
            <label
              className="block text-primary text-sm font-bold p-4"
              htmlFor="Email">
              Email
              <input
                className="
            bg-blue-900
            py-4
            font-poppins
            shadow appearance-none rounded w-full text-white placeholder-blue-300 leading-tight"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-4 bg-blue-900">
            <label
              className="block text-primary text-sm font-bold p-4"
              htmlFor="username">
              Username
              <input
                className="
              bg-blue-900
              py-4
              font-poppins
              shadow appearance-none rounded w-full text-white placeholder-blue-300 leading-tight"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="mb-6">
          <div className="mb-4 bg-blue-900">
            <label
              className="block text-primary text-sm font-bold p-4"
              htmlFor="password">
              Password
              <input
                className="
              bg-blue-900
              py-4
              font-poppins
              shadow appearance-none rounded w-full text-white placeholder-blue-300 leading-tight"
                id="password"
                type="password"
                placeholder="********"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center flex-wrap">
            <button
              onClick={(e) => {
                e.preventDefault()
                handleSignUp(email, password, username, name);
              }}
              className="bg-primary hover:bg-primary text-white font-bold py-4 px-8 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Sign Up
            </button>
            <div className="py-4 mr-0 ml-auto">
              <Link href="/login">
                <a className="font-noto text-primary font-semibold">
                  Already have an account? Sign In
                </a>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <div className="w-full">
      {type === "signIn" && signIn()}
      {type === "signUp" && signUp()}
    </div>
  );
};

export default AuthForm;
