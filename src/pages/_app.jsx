import firebase from "firebase";
import { useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import firebaseConfig from "../firebase/init";
import "../styles/global.css";
import "../styles/reset.css";

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

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
