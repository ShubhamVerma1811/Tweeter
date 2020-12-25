import firebase from "../firebase/init";

const postTweet = async (
  authorId,
  text,
  imgLink = null,
  parentTweet = null
) => {
  console.log(authorId, text, imgLink, parentTweet);
  await firebase.firestore().collection("tweets").add({
    authorId,
    text,
    parentTweet,
    imgLink,
    createdAt: firebase.firestore.Timestamp.now(),
  });
};

export default postTweet;
