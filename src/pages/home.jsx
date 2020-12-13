import CircularProgress from "@material-ui/core/CircularProgress";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Post from "../components/Post/Post";
import Suggestions from "../components/Suggestions/Suggestions";
import Trends from "../components/Trends/Trends";
import TweetInput from "../components/TweetInput/TweetInput";
import HomeTweetsContext from "../context/HomeTweetsContext";
import UserContext from "../context/UserContext";
import firebase from "../firebase/init";
import Layout from "../layouts";
import { fetchUser } from "../services/FetchData";

const Home = () => {
  const [homeTweets, setHomeTweets] = useState([]);

  const { user } = useContext(UserContext);
  const { homeTweetsContext, setHomeTweetsContext } = useContext(
    HomeTweetsContext
  );

  useEffect(async () => {
    try {
      if (user) {
        if (!homeTweetsContext) {
          const connectionsRef = await firebase
            .firestore()
            .collection("connections")
            .where("followerID", "==", user.uid)
            .get();

          const followerIDs = connectionsRef.docs.map((connection) => {
            const floID = connection.data().followeeID;
            return floID;
          });

          const tweetsSnapShot = await firebase
            .firestore()
            .collection("tweets")
            .where("authorId", "in", followerIDs)
            .where("parentTweet", "==", null)
            .orderBy("createdAt", "desc")
            .get();

          const homeUserTweets = [];

          for (let i = 0; i < tweetsSnapShot.size; i++) {
            const userInfo = await fetchUser({
              userID: tweetsSnapShot.docs[i].data().authorId,
            });
            let data = tweetsSnapShot.docs[i].data();

            homeUserTweets.push({
              ...data,
              createdAt: data.createdAt.toDate().toString(),
              id: tweetsSnapShot.docs[i].id,
              author: userInfo,
            });
          }
          setHomeTweets(homeUserTweets);
          setHomeTweetsContext(homeUserTweets);
        } else {
          setHomeTweets(homeTweetsContext);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  return (
    <div>
      <Head>
        <title>Home | Tweeter</title>
      </Head>

      <Layout>
        <div className="mx-4 sm:mx-12 md:mx-24 lg:mx-24 xl:mx-24 mt-5">
          <div className="flex flex-col lg:grid lg:grid-cols-3 lg:col-gap-5">
            <div className="lg:col-span-2">
              <div className="mb-5">
                <TweetInput />
              </div>
              {homeTweets && homeTweets.length > 0 ? (
                homeTweets.map((tweet) => (
                  <Link href={`${tweet.author.username}/status/${tweet.id}`}>
                    <div className="mb-5" key={tweet.id} key={tweet.id}>
                      <Post tweet={tweet} />
                    </div>
                  </Link>
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
                {user && <Suggestions userID={user.uid} />}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
