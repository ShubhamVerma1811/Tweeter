import CircularProgress from "@material-ui/core/CircularProgress";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Link from "next/link";
import React, { useState } from "react";
import { handleSignOut } from "../../services/Authentication";
import { deleteAccount } from "../../services/DeleteAccount";
import Avatar from "../Avatar/Avatar";

const ProfileDropDown = ({ user }) => {
  const [dropdown, setDropdown] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  return (
    <div>
      <div className="flex flex-row items-center mr-4">
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border  shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 "
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={() => setDropdown(!dropdown)}>
              {user && (
                <span className="w-8 h-8 overflow-hidden rounded-lg">
                  <Avatar src={user.profilePicture} />
                </span>
              )}
              <span className="hidden md:flex md:flex-col justify-center pl-2">
                {user && user.name}
              </span>
              <svg
                className="-mr-1 ml-2 w-5 flex flex-col justify-center"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {dropdown && user && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu">
                <Link href={`/${user.username}`}>
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem">
                    <span className="pr-4">
                      <AccountCircleIcon />
                    </span>
                    My Profile
                  </a>
                </Link>
                <hr />
                <button
                  type="submit"
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
                    deletingAccount
                      ? "text-red-300 cursor-not-allowed"
                      : "text-red-700"
                  } `}
                  role="menuitem"
                  onClick={async (e) => {
                    if (!deletingAccount) {
                      e.stopPropagation();
                      const answer = confirm(
                        `Are you sure you want to delete your account?\nThis would delete your tweets,likes,saves`
                      );
                      if (answer) {
                        setDeletingAccount(true);
                        await deleteAccount(user.uid);
                      }
                    }
                  }}>
                  <span className="pr-4">
                    <DeleteIcon htmlColor="#c53030" />
                  </span>
                  {deletingAccount ? "  Deleting Account..." : "Delete Account"}
                  {deletingAccount && (
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
                <hr />
                <button
                  type="submit"
                  className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  role="menuitem"
                  onClick={() => handleSignOut()}>
                  <span className="pr-4">
                    <ExitToAppIcon htmlColor="#c53030" />
                  </span>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDropDown;
