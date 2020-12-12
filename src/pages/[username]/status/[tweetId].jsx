import firebase from "firebase";
import Head from "next/head";
import React from "react";
import CommentInput from "../../../components/CommentInput/CommentInput";
import Comments from "../../../components/Comments/Comments";
import Post from "../../../components/Post/Post";
import Suggestions from "../../../components/Suggestions/Suggestions";
import Layout from "../../../layouts";
import { fetchUser } from "../../../services/FetchData";

const Tweet = ({ tweet }) => {
  return (
    <div>
      <Head>
        <title>
          {tweet.author.name} on Tweeter "{tweet.text}"
        </title>
      </Head>
      <Layout>
        <div>
          <div className="flex flex-col lg:gridlg: grid-cols-3 lg:col-gap-5 my-5 lg:mx=24 xl:mx-48">
            <div className="col-span-2">
              <Post tweet={tweet} />
              <CommentInput tweetID={tweet.id} />
              <Comments tweetID={tweet.id} />
            </div>
            <div className="hidden lg:block">
              <Suggestions />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export async function getServerSideProps(context) {
  const tweetID = context.params.tweetId;
  const res = await firebase
    .firestore()
    .collection("tweets")
    .doc(tweetID)
    .get();
  const tweet = res.data();
  const id = res.id;
  const user = await fetchUser({ userID: tweet.authorId });

  return {
    props: {
      tweet: {
        ...tweet,
        createdAt: tweet.createdAt.toDate().toString(),
        id,
        author: user,
      },
    },
  };
}

export default Tweet;
