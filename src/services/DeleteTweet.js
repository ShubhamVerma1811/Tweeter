import firebase from "../firebase/init";

const db = firebase.firestore();

export const deleteTweet = (tweetID) => {
  db.collection("tweets")
    .doc(tweetID)
    .delete()
    .then(() => console.log("Deleted Tweet"))
    .catch((e) => console.log(e));

  db.collection("likes")
    .where("tweetID", "==", tweetID)
    .get()
    .then((tweetsSnapShot) => {
      const batch = firebase.firestore().batch();
      tweetsSnapShot.forEach((tweetDocRef) => {
        batch.delete(tweetDocRef.ref);
      });
      batch
        .commit()
        .then(console.log("Deleted Likes"))
        .catch((e) => console.log(e));
    });

  db.collection("saves")
    .where("tweetID", "==", tweetID)
    .get()
    .then((tweetsSnapShot) => {
      const batch = firebase.firestore().batch();
      tweetsSnapShot.forEach((tweetDocRef) => {
        batch.delete(tweetDocRef.ref);
      });
      batch
        .commit()
        .then(console.log("Deleted Saves"))
        .catch((e) => console.log(e));
    });
};
