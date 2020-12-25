import firebase from "../firebase/init";
import { deleteTweet } from "./DeleteTweet";

const db = firebase.firestore();

export const deleteAccount = async (userID) => {
  // Delete user from firebase authentication

  // Delete user doc from "users" collection
  db.collection("users")
    .doc(userID)
    .delete()
    .then(console.log("Deleted User Doc"))
    .catch((e) => console.log(e));

  // Get all tweets that has authorID = user.uid in "tweets" collection
  const tweetsSnapShot = await db
    .collection("tweets")
    .where("authorId", "==", userID)
    .get();
  tweetsSnapShot.forEach((tweetsDoc) => {
    // Delete those tweets
    deleteTweet(tweetsDoc.id);
  });

  // Delete all connections
  await db
    .collection("connections")
    .where("followerID", "==", userID)
    .where("followeeID", "==", userID)
    .get()
    .then((connectionsSnapShot) => {
      const batch = firebase.firestore().batch();
      connectionsSnapShot.forEach((connectionDocRef) => {
        batch.delete(connectionDocRef.ref);
      });
      batch
        .commit()
        .then(console.log("Deleted Connections"))
        .catch((e) => console.log(e));
    });

  firebase
    .auth()
    .currentUser.delete()
    .then(() => console.log("Deleted user from auth"))
    .catch((e) => console.log(e));
};
