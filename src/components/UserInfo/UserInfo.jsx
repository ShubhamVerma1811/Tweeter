import CircularProgress from "@material-ui/core/CircularProgress";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import firebase from "firebase";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { useFollowers } from "../../hooks/useFollowers";
import { useFollowings } from "../../hooks/useFollowings";
import Avatar from "../Avatar/Avatar";
import Modal from "../Modal/Modal";

const UserInfo = ({ fetchedUser }) => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isFollowing, setIsFollowing] = useState(false);
  const [connectionDocID, setFollowingDocID] = useState("");

  const { followers, isFollowersLoading, getFollowers } = useFollowers(
    fetchedUser.uid
  );
  const { followings, isFollowingsLoading, getFollowings } = useFollowings(
    fetchedUser.uid
  );

  const startFollowing = () => {
    if (!user) {
      alert("You need to sign in for that");
      return;
    }
    const { id } = firebase.firestore().collection("connections").add({
      followerID: user.uid,
      followeeID: fetchedUser.uid,
    });
    setFollowingDocID(id);
    setIsFollowing(true);
  };

  const stopFollowing = () => {
    if (!user) {
      alert("You need to sign in for that");
      return;
    }
    firebase
      .firestore()
      .collection("connections")
      .doc(connectionDocID)
      .delete();
    setIsFollowing(false);
  };

  useEffect(() => {
    if (user) {
      async function checkFollowing() {
        const result = await firebase
          .firestore()
          .collection("connections")
          .where("followeeID", "==", fetchedUser.uid)
          .where("followerID", "==", user.uid)
          .get();
        if (result.size === 1) {
          setIsFollowing(true);
          setFollowingDocID(result.docs[0].id);
        }
      }

      checkFollowing();
    }
  }, [fetchedUser, user]);

  return (
    <div className="h-full flex flex-col lg:flex-row lg:items-center rounded-xl bg-white w-full">
      <div className=" mx-auto inline px-4">
        <div
          className="relative rounded-md lg:rounded-xl overflow-hidden bg-white  lg:p-2 h-24 w-24 lg:w-40 lg:h-40"
          style={{ top: "-20px" }}>
          <Avatar src={fetchedUser.profilePicture} />
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col justify-evenly w-full h-full ">
        <div className="relative flex flex-col lg:flex-row items-center">
          <span className="py-4">
            <p className="text-2xl font-poppins font-semibold">
              {fetchedUser.name}
            </p>
            <p
              className="inline mr-2 text-xs font-poppins font-semibold hover:underline cursor-pointer"
              onClick={async () => {
                await getFollowers();
                setIsModalOpen(true);
              }}>
              {fetchedUser.followersCount}
              <span className="m-1 text-gray-500">Followers</span>
            </p>
            <p
              className="inline m-2 text-xs font-poppins font-semibold hover:underline cursor-pointer"
              onClick={() => getFollowings()}>
              {fetchedUser.followingsCount}
              <span className="m-1 text-gray-500"> Following</span>
            </p>
          </span>
          {user && fetchedUser.username === user.username ? (
            <button
              className="lg:mr-0 lg:ml-auto bg-primary text-white px-2 py-4  lg:px-8 lg:py-4 rounded-md"
              type="submit"
              onClick={() => startFollowing()}>
              <span className="mx-2">
                <PersonAddIcon />
              </span>
              Edit Profile
            </button>
          ) : isFollowing ? (
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
        <div className="flex justify-center lg:block">
          {fetchedUser.bio ? (
            <p className="font-noto text-xl my-2 text-secondary">
              {fetchedUser.bio}
            </p>
          ) : (
            <p className="font-noto text-lg my-2 text-secondary">
              404 Bio Not Found
            </p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed w-4/5 h-full"
          style={{
            left: "50%",
            top: "0",
            transform: "translate(-50%, 20%)",
          }}>
          {followers ? (
            <Modal users={followers} close={() => setIsModalOpen(false)} />
          ) : (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserInfo;
