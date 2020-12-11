import Head from "next/head";
import Layout from "../..//layouts/index";
import Banner from "../../components/Banner/Banner";
import Filters from "../../components/Filters/Filters";
import Post from "../../components/Post/Post";
import UserInfo from "../../components/UserInfo/UserInfo";
import fetchAllUserData from "../../services/FetchUser";

const UserName = ({ fetchedUser, tweets }) => {
  return (
    <div>
      <Head>
        <title>
          {fetchedUser.name} (@{fetchedUser.username}) | Tweeter
        </title>
      </Head>

      <Layout />
      <Banner />
      <div
        className="flex mx-6 sm:mx-12 md:mx-24 justify-center relative m-auto"
        style={{
          top: "-100px",
        }}
      >
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
                <div className="mb-5" key={tweet.id}>
                  <Post tweet={tweet} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
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
