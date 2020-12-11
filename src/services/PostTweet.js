import firebase from "firebase";

const postTweet = async (authorId, text, imgLink, parentTweet = null) => {
  await firebase.firestore().collection("tweets").add({
    authorId,
    text,
    parentTweet,
    imgLink,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export default postTweet;
