import firebase from "firebase";

const db = firebase.firestore();

export const fetchUser = async ({ username, userID }) => {
  let userQuerySnapShot;
  if (username) {
    userQuerySnapShot = await db
      .collection("users")
      .where("username", "==", username)
      .get();
    if (userQuerySnapShot.empty) {
      return null;
    }
    return {
      ...userQuerySnapShot.docs[0].data(),
      uid: userQuerySnapShot.docs[0].id,
    };
  }
  if (userID) {
    userQuerySnapShot = await db.collection("users").doc(userID).get();
    return {
      ...userQuerySnapShot.data(),
      uid: userQuerySnapShot.id,
    };
  }
};

export const fetchUserTweets = async (userID) => {
  const tweetsQuerySnapShot = await db
    .collection("tweets")
    .where("authorId", "==", userID)
    .where("parentTweet", "==", null)
    .get();

  const fetchedUser = await fetchUser({ userID });

  // tweets = tweets Array of  Objects
  const tweets = tweetsQuerySnapShot.docs.map((tweet) => {
    const data = tweet.data();

    return {
      id: tweet.id,
      ...data,
      author: fetchedUser,
      createdAt: data.createdAt.toDate().toString(),
    };
  });
  // returns array of objects (tweets)
  return tweets;
};

export const fetchUserFollowers = async (userID) => {
  return await db
    .collection("connections")
    .where("followeeID", "==", userID)
    .get();
};

export const fetchUserFollowings = async (userID) => {
  return await db
    .collection("connections")
    .where("followerID", "==", userID)
    .get();
};

export const fetchTweetLikes = (tweetID) => {
  return firebase
    .firestore()
    .collection("likes")
    .where("tweetID", "==", tweetID)
    .get();
};

export const fetchTweetSaves = (tweetID) => {
  return firebase
    .firestore()
    .collection("saves")
    .where("tweetID", "==", tweetID)
    .get();
};

const fetchAllUserData = async (username) => {
  let fetchedUser = await fetchUser({ username });
  if (fetchedUser === null) {
    return null;
  }
  const tweets = await fetchUserTweets(fetchedUser.uid);
  const followersCount = (await fetchUserFollowers(fetchedUser.uid)).size;
  const followingsCount = (await fetchUserFollowings(fetchedUser.uid)).size;
  fetchedUser = {
    ...fetchedUser,
    followersCount,
    followingsCount,
  };

  return {
    fetchedUser,
    tweets,
  };
};

export default fetchAllUserData;