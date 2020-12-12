import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "firebase";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Post from "../components/Post/Post";
import Suggestions from "../components/Suggestions/Suggestions";
import Trends from "../components/Trends/Trends";
import UserContext from "../context/UserContext";
import Layout from "../layouts";
import { fetchTweet } from "../services/FetchData";

const Bookmarks = () => {
  const { user } = useContext(UserContext);
  const [bookmarkTweets, setBookmarkTweets] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (user) {
      async function getSavedTweets() {
        const localBMTweets = [];
        const savesSnapShot = await firebase
          .firestore()
          .collection("saves")
          .where("userID", "==", user.uid)
          .get();

        if (savesSnapShot.empty) {
          setIsEmpty(true);
          setBookmarkTweets([]);
          setIsLoading(false);
        } else {
          for (let i = 0; i < savesSnapShot.size; i++) {
            const tweet = await fetchTweet(
              savesSnapShot.docs[i].data().tweetID
            );
            localBMTweets.push(tweet);
          }
          setBookmarkTweets(localBMTweets);
          setIsEmpty(false);
          setIsLoading(false);
        }
      }
      getSavedTweets(user.uid);
    }
  }, [user]);

  return (
    <div>
      <Head>
        <title>Explore | Tweeter</title>
      </Head>
      <Layout>
        <div className="mx-4 sm:mx-12 md:mx-24 lg:mx-24 mt-5">
          <div className="flex flex-col lg:grid lg:grid-cols-3 lg:col-gap-5">
            <div className="lg:col-span-2">
              {loading && (
                <div className="flex justify-center">
                  <CircularProgress />
                </div>
              )}
              {isEmpty ? (
                <h1>You have no Saved Tweets</h1>
              ) : (
                bookmarkTweets.map((tweet) => (
                  <div className="mb-5">
                    <Post tweet={tweet} />
                  </div>
                ))
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
      </Layout>
    </div>
  );
};

export default Bookmarks;
