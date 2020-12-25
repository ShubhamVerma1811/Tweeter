import CircularProgress from "@material-ui/core/CircularProgress";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Filters from "../components/Filters/Filters";
import Post from "../components/Post/Post";
import BookmarksTweetsContext from "../context/BookmarksTweetsContext";
import UserContext from "../context/UserContext";
import firebase from "../firebase/init";
import Layout from "../layouts";
import { fetchTweet } from "../services/FetchData";

const Bookmarks = () => {
  const { user } = useContext(UserContext);
  const [bookmarkTweets, setBookmarkTweets] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const { bookmarksTweetsContext, setBookmarksTweetsContext } = useContext(
    BookmarksTweetsContext
  );

  useEffect(() => {
    if (user) {
      if (!bookmarksTweetsContext) {
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
            setBookmarksTweetsContext(localBMTweets);
            setIsEmpty(false);
            setIsLoading(false);
          }
        }
        getSavedTweets(user.uid);
      } else {
        setBookmarkTweets(bookmarksTweetsContext);
        setIsEmpty(false);
        setIsLoading(false);
      }
    }
  }, [user]);

  return (
    <div>
      <Head>
        <title>Bookmarks | Tweeter</title>
      </Head>
      <Layout>
        <div className="mx-4 sm:mx-12 md:mx-24 lg:mx-24 mt-5">
          <div className="flex flex-col lg:grid lg:grid-cols-3 lg:col-gap-5">
            <div className="hidden lg:block lg:col-span-1">
              <div className="mb-5">
                <Filters />
              </div>
            </div>
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
                  <Link href={`${tweet.author.username}/status/${tweet.id}`}>
                    <div className="mb-5">
                      <Post tweet={tweet} />
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Bookmarks;
