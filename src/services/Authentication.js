import firebase from "firebase";

// firebase.auth().useEmulator("http://localhost:9099");

async function handleSignUp(email, password, username, name) {
  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await firebase.firestore().collection("users").doc(user.uid).set({
      username,
      email: user.email,
      profilePicture: null,
      name,
      bio: null,
    });
    return user;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function handleSignIn(email, password) {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    return user;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function handleSignOut() {
  try {
    await firebase.auth().signOut();
    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
}
export { handleSignIn, handleSignUp, handleSignOut };
