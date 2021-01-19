import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { useFollowers } from "../../hooks/useFollowers";
import { useFollowings } from "../../hooks/useFollowings";
import Avatar from "../Avatar/Avatar";
import FollowButton from "../FollowButton/FollowButton";
import Modal from "../Modal/Modal";

const UserInfo = ({ fetchedUser }) => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(true);

  const { followers, getFollowers } = useFollowers(fetchedUser.uid);
  const { followings, getFollowings } = useFollowings(fetchedUser.uid);

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
                setIsModalOpen(true);
                await getFollowers();
                setIsModalLoading(false);
              }}>
              {fetchedUser.followersCount - 1}
              <span className="m-1 text-gray-500">Followers</span>
            </p>
            <p
              className="inline m-2 text-xs font-poppins font-semibold hover:underline cursor-pointer"
              onClick={() => getFollowings()}>
              {fetchedUser.followingsCount - 1}
              <span className="m-1 text-gray-500"> Following</span>
            </p>
          </span>
          {user && fetchedUser.username === user.username ? (
            <button
              className="lg:mr-0 lg:ml-auto bg-primary text-white px-2 py-4  lg:px-8 lg:py-4 rounded-md"
              type="submit">
              <span className="mx-2">
                <PersonAddIcon />
              </span>
              Edit Profile
            </button>
          ) : (
            <div className="mr-0 ml-auto">
              <FollowButton userID={fetchedUser.uid} />
            </div>
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
          <Modal
            users={followers}
            close={() => setIsModalOpen(false)}
            loading={isModalLoading}
          />
        </div>
      )}
    </div>
  );
};

export default UserInfo;
