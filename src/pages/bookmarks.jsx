import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "firebase";
import { useContext, useEffect, useState } from "react";
import Post from "../components/Post/Post";
import Suggestions from "../components/Suggestions/Suggestions";
import Trends from "../components/Trends/Trends";
import UserContext from "../context/UserContext";
import Layout from "../layouts";
import { fetchUser } from "../services/FetchUser";

const Bookmarks = () => {
  const { user } = useContext(UserContext);
  const [bookmarkTweets, setBookmarkTweets] = useState([]);

  useEffect(() => {
    if (user) {
      async function getSavedTweets(userID) {
        const localBMTweets = [];
        const savesSnapShot = await firebase
          .firestore()
          .collection("saves")
          .get();
        for (let i = 0; i < savesSnapShot.size; i++) {
          const userInfo = await fetchUser({
            userID: savesSnapShot.docs[i].data().userID,
          });
          const tweets = await firebase
            .firestore()
            .collection("tweets")
            .doc(savesSnapShot.docs[i].data().tweetID)
            .get();

          localBMTweets.push({
            author: userInfo,
            ...tweets.data(),
            createdAt: tweets.data().createdAt.toDate().toString(),
            id: tweets.id,
          });
        }
        setBookmarkTweets(localBMTweets);
      }
      getSavedTweets(user.uid);
    }
  }, [user]);

  return (
    <div>
      <Layout />
      <div className="mx-4 sm:mx-12 md:mx-24 lg:mx-24 mt-5">
        <div className="flex flex-col lg:grid lg:grid-cols-3 lg:col-gap-5">
          <div className="lg:col-span-2">
            {bookmarkTweets && bookmarkTweets.length > 0 ? (
              bookmarkTweets.map((tweet) => (
                <div className="mb-5">
                  <Post tweet={tweet} />
                </div>
              ))
            ) : (
              <div className="flex justify-center">
                <CircularProgress />
              </div>
            )}
          </div>
          <div className="hidden lg:block lg:col-span-1">
            <div className="mb-5">
              <Trends />
            </div>
            <div className="mb-5">
              <Suggestions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
