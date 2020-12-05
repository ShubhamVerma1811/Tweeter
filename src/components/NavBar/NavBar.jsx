import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExploreIcon from "@material-ui/icons/Explore";
import GroupIcon from "@material-ui/icons/Group";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import Link from "next/link";
import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { handleSignOut } from "../../services/Authentication";
import Avatar from "../Avatar/Avatar";


const NavBar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="font-poppins bg-white">
      <nav className="justify-between h-16 flex flex-row lg:justify-between items-center">
        <Link href="/home">
          <img
            className="cursor-pointer ml-4"
            src="images/logos/tweeter.svg"
            alt="logo"
          />
        </Link>

        <div className="hidden lg:block menu">
          <Link href="/home">
            <li className="list-none inline-block mx-20 cursor-pointer">
              Home
            </li>
          </Link>
          <Link href="/explore">
            <li className="list-none inline-block mx-20 cursor-pointer">
              Explore
            </li>
          </Link>
          <Link href="/bookmarks">
            <li className="list-none inline-block mx-20 cursor-pointer">
              Bookmarks
            </li>
          </Link>
        </div>

        <div className="bg-white w-full lg:hidden flex justify-between items-center fixed bottom-0 h-16 px-4">
          <Link href="/home">
            <span>
              <HomeIcon fontSize="large" style={{ color: "#828282" }} />
            </span>
          </Link>
          <Link href="/explore">
            <span>
              <ExploreIcon fontSize="large" style={{ color: "#2F80ED" }} />
            </span>
          </Link>
          <Link href="/bookmarks">
            <span>
              <BookmarkIcon fontSize="large" style={{ color: "#828282" }} />
            </span>
          </Link>
        </div>

        <div className="flex flex-row items-center mr-4">
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
              >
                {user && (
                  <span className="w-8 h-8 overflow-hidden rounded-lg">
                    <Avatar src={user.profilePicture} />
                  </span>
                )}
                {user && user.name}
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  <span className="pr-4">
                    <AccountCircleIcon />
                  </span>
                  My Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  <span className="pr-4">
                    <GroupIcon />
                  </span>
                  Group Chat
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  <span className="pr-4">
                    <SettingsIcon />
                  </span>
                  Settings
                </a>
                <hr />
                <button
                  type="submit"
                  className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  role="menuitem"
                  onClick={() => handleSignOut()}
                >
                  <span className="pr-4">
                    <ExitToAppIcon color="red" />
                  </span>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
