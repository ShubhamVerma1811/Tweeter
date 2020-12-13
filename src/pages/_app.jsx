import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import firebase from "../firebase/init";
import "../styles/global.css";
import "../styles/reset.css";

const db = firebase.firestore();

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  const Router = useRouter();

  // useEffect(() => {
  //   if (!user) {
  //     if (Router.pathname === "/home") {
  //       Router.push("/login");
  //     }
  //   }
  // }, [user]);

  useEffect(() => {
    async function getCurrentUser(userID) {
      const user = await db.collection("users").doc(userID).get();
      setUser({ ...user.data(), uid: userID });
    }

    firebase.auth().onAuthStateChanged((loggedUser) => {
      if (!loggedUser) {
        setUser(null);
      } else {
        getCurrentUser(loggedUser.uid);
      }
    });
  }, []);

  return (
    <>
      <title>Tweeter</title>
      <UserContext.Provider value={{ user, setUser }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
