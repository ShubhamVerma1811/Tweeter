import React from "react";
import { fetchUser, fetchUserFollowers } from "../services/FetchUser";

export function useFollowers(userId) {
  const [followers, setFollowers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getFollowers = async () => {
    const data = [];
    setIsLoading(true);
    const followersSnapShot = await fetchUserFollowers(userId);
    for (let i = 0; i < followersSnapShot.size; i++) {
      data.push(
        await fetchUser({
          userID: followersSnapShot.docs[i].data().followerID,
        })
      );
    }
    setFollowers(data);
    setIsLoading(false);
  };

  React.useEffect(() => {
    getFollowers();
  }, []);

  return { followers, isLoading };
}
