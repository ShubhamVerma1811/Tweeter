import BookmarkIcon from "@material-ui/icons/Bookmark";
import ExploreIcon from "@material-ui/icons/Explore";
import HomeIcon from "@material-ui/icons/Home";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";

const NavBar = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  return (
    <div className="font-poppins bg-white">
      <nav className="justify-between h-16 flex flex-row lg:justify-between items-center">
        <Link href="/home">
          <img
            className="cursor-pointer ml-4"
            src="/images/logos/tweeter.svg"
            alt="logo"
          />
        </Link>

        <div className="hidden lg:block menu">
          {user && (
            <Link href="/home">
              <li
                className={`list-none inline-block mx-20 cursor-pointer ${
                  router.route === "/home" ? "text-primary font-semibold" : ""
                }`}>
                Home
              </li>
            </Link>
          )}
          <Link href="/explore">
            <li
              className={`list-none inline-block mx-20 cursor-pointer ${
                router.route === "/explore" ? "text-primary font-semibold" : ""
              }`}>
              Explore
            </li>
          </Link>
          {user && (
            <Link href="/bookmarks">
              <li
                className={`list-none inline-block mx-20 cursor-pointer ${
                  router.route === "/bookmarks"
                    ? "text-primary font-semibold"
                    : ""
                }`}>
                Bookmarks
              </li>
            </Link>
          )}
        </div>

        <div className="bg-white w-full lg:hidden flex justify-between items-center fixed bottom-0 h-16 px-4">
          <div>
            {user && (
              <Link href="/home">
                <span>
                  <HomeIcon
                    fontSize="large"
                    style={{
                      color: router.route === "/home" ? "#2F80ED" : "#828282",
                    }}
                  />
                </span>
              </Link>
            )}
          </div>
          <div>
            <Link href="/explore">
              <span>
                <ExploreIcon
                  fontSize="large"
                  style={{
                    color: router.route === "/explore" ? "#2F80ED" : "#828282",
                  }}
                />
              </span>
            </Link>
          </div>
          <div>
            {user && (
              <Link href="/bookmarks">
                <span>
                  <BookmarkIcon
                    fontSize="large"
                    style={{
                      color:
                        router.route === "/bookmarks" ? "#2F80ED" : "#828282",
                    }}
                  />
                </span>
              </Link>
            )}
          </div>
        </div>
        <div>{user && <ProfileDropDown user={user} />}</div>
      </nav>
    </div>
  );
};

export default NavBar;
