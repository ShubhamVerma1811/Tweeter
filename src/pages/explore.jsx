import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "../firebase/init";

import Head from "next/head";
import React, { useEffect, useState } from "react";
import ExploreFilters from "../components/ExploreFIlters/ExploreFilters";
import Post from "../components/Post/Post";
import Layout from "../layouts";
import { fetchUser } from "../services/FetchData";
import Link from "next/link";

const Explore = () => {
  const [exploreTweets, setExploreTweets] = useState([]);

  useEffect(async () => {
    const tweetsSnapShot = await firebase
      .firestore()
      .collection("tweets")
      .limit(5)
      .get();

    const exploreUserTweets = [];

    for (let i = 0; i < tweetsSnapShot.size; i++) {
      const userInfo = await fetchUser({
        userID: tweetsSnapShot.docs[i].data().authorId,
      });
      let data = tweetsSnapShot.docs[i].data();

      exploreUserTweets.push({
        ...data,
        createdAt: data.createdAt.toDate().toString(),
        id: tweetsSnapShot.docs[i].id,
        author: userInfo,
      });
    }
    setExploreTweets(exploreUserTweets);
  }, []);

  return (
    <div>
      <Head>
        <title>Explore | Tweeter</title>
      </Head>
      <Layout>
        <div className="mx-4 sm:mx-12 md:mx-24 lg:mx-48 mt-5">
          <div className="flex flex-col lg:grid lg:grid-cols-3 lg:col-gap-5">
            <div className="hidden lg:block lg:col-span-1">
              <div className="mb-5">
                <ExploreFilters />
              </div>
            </div>
            <div className="lg:col-span-2">
              {exploreTweets && exploreTweets.length > 0 ? (
                exploreTweets.map((tweet) => (
                  <Link href={`${tweet.author.username}/status/${tweet.id}`}>
                    <div className="mb-5">
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
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Explore;
