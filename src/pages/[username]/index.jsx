import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../..//layouts/index";
import Banner from "../../components/Banner/Banner";
import Filters from "../../components/Filters/Filters";
import Post from "../../components/Post/Post";
import UserInfo from "../../components/UserInfo/UserInfo";
import fetchAllUserData from "../../services/FetchData";

const UserName = ({ fetchedUser, tweets }) => {
  const [userExits, setUserExits] = useState(false);

  useEffect(() => {
    if (fetchedUser) {
      setUserExits(true);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>
          {userExits
            ? `${fetchedUser.name} (@${fetchedUser.username}) | Tweeter`
            : `USER NOT FOUND`}
        </title>
      </Head>

      <Layout>
        {userExits ? (
          <>
            <Banner />
            <div
              className="flex mx-6 sm:mx-12 md:mx-24 justify-center relative m-auto"
              style={{
                top: "-100px",
              }}>
              <UserInfo fetchedUser={fetchedUser} />
            </div>
            <div className="mx-4 sm:mx-12 md:mx-24 m-auto">
              <div className="flex flex-col lg:grid lg:grid-cols-3 lg:col-gap-5">
                <div className="mb-5">
                  <Filters />
                </div>
                <div className="col-span-2">
                  {tweets.map((tweet) => {
                    return (
                      <span key={tweet.id}>
                        <Link
                          href={`${tweet.author.username}/status/${tweet.id}`}>
                          <div className="mb-5">
                            <Post tweet={tweet} />
                          </div>
                        </Link>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          <h1>User Not Found</h1>
        )}
      </Layout>
    </div>
  );
};

export async function getServerSideProps(context) {
  const userInfo = await fetchAllUserData(context.params.username);

  return {
    props: {
      ...userInfo,
    },
  };
}

export default UserName;
