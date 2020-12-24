import { useEffect, useState } from "react";
import firebase from "../../firebase/init";
import { fetchUser } from "../../services/FetchData";
import Avatar from "../Avatar/Avatar";

const Comments = ({ tweetID }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        firebase
          .firestore()
          .collection("tweets")
          .where("parentTweet", "==", tweetID)
          .onSnapshot(async (tweetsRef) => {
            const localComments = [];

            for (let i = 0; i < tweetsRef.size; i++) {
              const tweet = tweetsRef.docs[i].data({
                serverTimestamps: "estimate",
              });
              const id = tweetsRef.docs[i].id;
              const userInfo = await fetchUser({
                userID: tweet.authorId,
              });
              localComments.push({
                ...tweet,
                id,
                createdAt: tweet.createdAt.toDate().toString(),
                author: userInfo,
              });
            }
            setComments(localComments);
          });
      } catch (err) {
        console.log(err);
      }
    };

    getComments();
  }, []);

  return (
    <div className="bg-white rounded-b-lg">
      {comments &&
        comments.length > 0 &&
        comments.map((comment) => (
          <div className="rounded-lg" key={comment.id}>
            <div className="flex flex-row">
              <div className="m-2 w-12 h-12">
                <Avatar src={comment.author.profilePicture} />
              </div>
              <div className="flex flex-col  w-full">
                <div className="bg-gray-200 p-4">
                  <div className="p-2">
                    <p className="inline-block font-poppins font-medium">
                      {comment.author.name}
                    </p>
                    <p className="inline-block font-noto font-medium text-xs text-gray-600">
                      {comment.createdAt}{" "}
                    </p>
                  </div>
                  <div className="p-2">
                    <p className="font-noto text-gray-700">{comment.text}</p>
                  </div>
                </div>
                {/* <div className="flex flex-row py-4">
                  <button type="submit">
                    <span>
                      <FavoriteBorderIcon />
                    </span>
                    Like
                  </button>
                  <p className="px-2">.</p>
                  <p className="font-noto font-semibold text-gray-400">
                    12k Likes
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Comments;
