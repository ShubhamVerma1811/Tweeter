import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Link from "next/link";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Avatar from "../Avatar/Avatar";

const Modal = ({ users }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex flex-row py-2">
        <p className="font-poppins font-semibold inline">
          {user.name} is following
        </p>
        <div className="mr-0 ml-auto ">
          <p className="text-xl">X</p>
        </div>
      </div>
      <hr />
      {users.map((user) => {
        return (
          <div className="py-4 ">
            <div className="flex flex-row items-center">
              <div className="w-10 h-10 overflow-hidden rounded-lg mr-4">
                <Avatar src={user.profilePicture} />
              </div>
              <div>
                <Link href={`/${user.username}`}>
                  <p className="cursor-pointer font-poppins font-medium py-2 hover:underline">
                    {user.name}
                  </p>
                </Link>
                <p className="font-noto text-gray-600 py-2">120k Followers</p>
              </div>
              <div className="ml-auto mr-0 lg:mr-0 lg:ml-auto">
                <button
                  className=" bg-primary text-white px-8 py-2 rounded-md"
                  type="submit"
                >
                  <span className="mx-2">
                    <PersonAddIcon />
                  </span>
                  Follow
                </button>
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
