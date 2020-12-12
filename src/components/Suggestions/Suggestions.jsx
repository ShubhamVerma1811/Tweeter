import CircularProgress from "@material-ui/core/CircularProgress";

import { useEffect, useState } from "react";
import { fetchUser, fetchUserFollowers } from "../../services/FetchData";
import Avatar from "../Avatar/Avatar";

const Suggestions = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const localUser = await fetchUser({
      userID: "RLxWOdfowdVStsGBI6rDWDoaXCZ2",
    });
    const followersCount = await fetchUserFollowers(localUser.uid);
    setUser({ ...localUser, followersCount: followersCount.size });
    setLoading(false);
  }, []);

  return (
    <div
      className="bg-white w-full p-5 rounded-lg"
      // style={{ height: "max-content" }}
    >
      <p className="font-poppins font-semibold text-base mb-3">Who to Follow</p>
      <hr />
      {loading && (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      )}
      {user && (
        <div>
          <div className="flex flex-row my-4">
            <div className="w-12 h-12 mr-4">
              <Avatar src={user.profilePicture} />
            </div>
            <div className="flex flex-col">
              <p className="font-poppins font-medium">{user.name}</p>
              <p className="font-noto font-medium text-sm text-gray-600">
                {user.followersCount} Followers
              </p>
            </div>
            <button
              className="bg-primary mr-0 ml-auto text-white px-8 py-4 rounded-md lg:px-4 lg:py-2"
              type="submit">
              Follow
            </button>
          </div>
          <div>
            <p className="font-noto font-medium text-gray-600 my-4">
              {user.bio}
            </p>
          </div>
          <div
            className="overflow-hidden rounded-lg"
            style={{
              height: "100px",
              maxHeight: "300px",
            }}>
            <img
              className="w-full"
              src="https://images.unsplash.com/photo-1522439748419-3cd697a86028?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
              alt="banner"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Suggestions;
