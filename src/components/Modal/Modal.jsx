import PersonAddIcon from "@material-ui/icons/PersonAdd";
import firebase from "../../firebase/init";
import Link from "next/link";
import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import Avatar from "../Avatar/Avatar";

const Modal = ({ users, close }) => {
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
      <hr />

      {users.map((localUser) => {
        if (localUser) {
          const result = firebase
            .firestore()
            .collection("connections")
            .where("followeeID", "==", localUser.uid)
            .where("followerID", "==", user.uid)
            .get()
            .then((res) => res);

          if (result.size === 1) {
            setIsFollowing(true);
            setFollowingDocID(result.docs[0].id);
          }
        }

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
                {isFollowing ? (
                  <button
                    className="lg:mr-0 lg:ml-auto bg-primary text-white px-2 py-4  lg:px-8 lg:py-4 rounded-md"
                    type="submit"
                    onClick={() => stopFollowing()}>
                    <span className="mx-2">
                      <PersonAddIcon />
                    </span>
                    Following
                  </button>
                ) : (
                  <button
                    className="lg:mr-0 lg:ml-auto bg-primary text-white px-2 py-4  lg:px-8 lg:py-4 rounded-md"
                    type="submit"
                    onClick={() => startFollowing()}>
                    <span className="mx-2">
                      <PersonAddIcon />
                    </span>
                    Follow
                  </button>
                )}
              </div>
            </div>
            {user.bio && (
              <div>
                <p className="font-noto font-medium text-gray-600">
                  {user.bio}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Modal;
