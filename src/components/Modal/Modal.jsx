import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "next/link";
import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import Avatar from "../Avatar/Avatar";
import FollowButton from "../FollowButton/FollowButton";

const Modal = ({ users, close, loading }) => {
  const { user } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followingDocID, setFollowingDocID] = useState("");

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex flex-row py-2">
        <p className="font-poppins font-semibold inline">
          {user.name} is following
        </p>
        <div className="mr-0 ml-auto ">
          <p className="text-xl" onClick={close}>
            X
          </p>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      )}
      <hr />
      {users.map((localUser) => {
        return (
          <div className="py-4 ">
            <div className="flex flex-row items-center">
              <div className="w-10 h-10 overflow-hidden rounded-lg mr-4">
                <Avatar src={localUser.profilePicture} />
              </div>
              <div>
                <Link href={`/${localUser.username}`}>
                  <p className="cursor-pointer font-poppins font-medium py-2 hover:underline">
                    {localUser.name}
                  </p>
                </Link>
                <p className="font-noto text-gray-600 py-2">120k Followers</p>
              </div>
              <div className="ml-auto mr-0 lg:mr-0 lg:ml-auto">
                <FollowButton userID={localUser.uid} />
              </div>
            </div>
            <div>
              <p className="font-noto font-medium text-gray-600">
                {localUser.bio ? localUser.bio : "404 Bio Not Found"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Modal;
