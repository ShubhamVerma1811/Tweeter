import React from "react";
import { fetchUser, fetchUserFollowings } from "../services/FetchUser";

export function useFollowings(userId) {
  const [followings, setFollowings] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getFollowers = async () => {
    const data = [];
    setIsLoading(true);
    const followersSnapShot = await fetchUserFollowings(userId);
    for (let i = 0; i < followersSnapShot.size; i++) {
      data.push(
        await fetchUser({
          userID: followersSnapShot.docs[i].data().followeeID,
        })
      );
    }
    setFollowings(data);
    setIsLoading(false);
  };

  React.useEffect(() => {
    getFollowers();
  }, []);

  return { followings, isLoading };
}
