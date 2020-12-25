import firebase from "../firebase/init";

async function handleSignUp(email, password, username, name) {
  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await firebase.firestore().collection("users").doc(user.uid).set({
      username,
      email: user.email,
      profilePicture:
        "https://firebasestorage.googleapis.com/v0/b/tweeter-45929.appspot.com/o/defaultAvatar.jpg?alt=media&token=072d3268-84f4-4016-b0f7-d440930347f2",
      name,
      bio: null,
    });

    await firebase.firestore().collection("connections").add({
      followerID: user.uid,
      followeeID: user.uid,
    });

    window.location.replace("/home");
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
    window.location.replace("/home");
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function handleSignOut() {
  try {
    await firebase.auth().signOut();
    window.location.replace("/");
    return true;
  } catch (error) {
    console.error(error);

    return error;
  }
}
export { handleSignIn, handleSignUp, handleSignOut };
