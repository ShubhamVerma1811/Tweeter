import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "next/link";
import { useState } from "react";
import shortID from "shortid";
import { handleSignIn, handleSignUp } from "../../services/Authentication";

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authErrMsg, setAuthErrMsg] = useState(null);

  const signIn = () => (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setAuthLoading(true);
          const { message } = await handleSignIn(email, password);
          setAuthErrMsg(message);
          setAuthLoading(false);
        }}>
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
          {authErrMsg && (
            <div>
              <p className="text-red-600 font-noto font-semibold">
                {authErrMsg}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-row flex-wrap items-center">
          <button
            className={`relative text-white font-bold py-4 px-8 rounded focus:outline-none focus:shadow-outline ${
              authLoading ? "cursor-not-allowed bg-blue-300" : "bg-primary"
            } `}
            type="submit">
            Sign In
            {authLoading && (
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: " translate(-50%, -50%)",
                }}>
                <CircularProgress />
              </span>
            )}
          </button>
          <div className="py-4 mr-0 ml-auto">
            <Link href="/signup">
              <a className="font-noto text-white font-semibold">
                Create an account?
              </a>
            </Link>
          </div>
        </div>
      </form>
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
          <div>
            {authErrMsg && (
              <div>
                <p className="text-red-600 font-noto font-semibold">
                  {authErrMsg}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-row items-center flex-wrap">
            <button
              onClick={async (e) => {
                e.preventDefault();
                setAuthLoading(true);
                const { message } = await handleSignUp(
                  email,
                  password,
                  username + shortID.generate(),
                  name
                );
                setAuthErrMsg(message);
                setAuthLoading(false);
              }}
              className={`relative text-white font-bold py-4 px-8 rounded focus:outline-none focus:shadow-outline ${
                authLoading ? "cursor-not-allowed bg-blue-300" : "bg-primary"
              } `}
              type="submit">
              Sign Up
              {authLoading && (
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: " translate(-50%, -50%)",
                  }}>
                  <CircularProgress />
                </span>
              )}
            </button>
            <div className="py-4 mr-0 ml-auto">
              <Link href="/login">
                <a className="font-noto text-white font-semibold">
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
