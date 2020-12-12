import React from "react";
import { fetchUser, fetchUserFollowers } from "../services/FetchData";

export function useFollowers(userId) {
  const [followers, setFollowers] = React.useState([]);
  const [isFollowersLoading, setIsFollowersLoading] = React.useState(true);

  const getFollowers = async () => {
    const data = [];
    setIsFollowersLoading(true);
    const followersSnapShot = await fetchUserFollowers(userId);
    for (let i = 0; i < followersSnapShot.size; i++) {
      data.push(
        await fetchUser({
          userID: followersSnapShot.docs[i].data().followerID,
        })
      );
    }
    console.log(data);
    setFollowers(data);
    setIsFollowersLoading(false);
  };

  return { followers, isFollowersLoading, getFollowers };
}
