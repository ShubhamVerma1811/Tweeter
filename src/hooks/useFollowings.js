import React from "react";
import { fetchUser, fetchUserFollowings } from "../services/FetchData";

export function useFollowings(userId) {
  const [followings, setFollowings] = React.useState([]);
  const [isFollowingsLoading, setIsFollowingsLoading] = React.useState(true);

  const getFollowings = async () => {
    const data = [];
    setIsFollowingsLoading(true);
    const followersSnapShot = await fetchUserFollowings(userId);
    for (let i = 0; i < followersSnapShot.size; i++) {
      data.push(
        await fetchUser({
          userID: followersSnapShot.docs[i].data().followeeID,
        })
      );
    }
    setFollowings(data);
    setIsFollowingsLoading(false);
  };

  return { followings, isFollowingsLoading, getFollowings };
}
