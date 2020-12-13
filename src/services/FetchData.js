import firebase from "../firebase/init";

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
    if (userQuerySnapShot.exists) {
      return {
        ...userQuerySnapShot.data(),
        uid: userQuerySnapShot.id,
      };
    } else {
      return null;
    }
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

export const fetchTweet = async (tweetID) => {
  const tweet = await firebase
    .firestore()
    .collection("tweets")
    .doc(tweetID)
    .get();

  if (!tweet.exists) return null;
  const user = await fetchUser({ userID: tweet.data().authorId });
  return {
    ...tweet.data(),
    author: user,
    id: tweetID,
    createdAt: tweet.data().createdAt.toDate().toString(),
  };
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
