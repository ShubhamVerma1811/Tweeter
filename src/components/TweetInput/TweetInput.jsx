import PhotoIcon from "@material-ui/icons/Photo";
import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import firebase from "../../firebase/init";
import postTweet from "../../services/PostTweet";
import Avatar from "../Avatar/Avatar";

const TweetInput = () => {
  const [tweet, setTweet] = useState("");
  const { user } = useContext(UserContext);
  const [imgLink, setImgLink] = useState(null);
  const [file, setFile] = useState(null);

  const fileInputRef = React.createRef();

  const uploadFile = async () => {
    const storageRef = firebase.storage().ref("tweets/" + file.name);
    const task = await storageRef.put(file);
    const link = await storageRef.getDownloadURL("tweets/" + file.name);
    setImgLink(link);
  };

  return (
    <div className=" bg-white rounded-lg h-auto overflow-hidden ">
      <div className="p-5">
        <div className="flex flex-row my-5">
          <div className="w-20 h-20 rounded-lg overflow-hidden">
            {user && <Avatar src={user.profilePicture} />}
          </div>

          <div className="w-full mx-5">
            <div className="flex flex-col">
              <textarea
                className="w-full h-16 font-noto font-medium text-base text-gray-500"
                name="tweet-input"
                placeholder="What's Happening?"
                type="text"
                onChange={(e) => setTweet(e.target.value)}
              />
              <div className="flex items-center mt-3">
                <div className="mx-2">
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setFile(e.target.files[0])}
                    // file state
                    ref={fileInputRef}
                  />
                  <span className="hover:bg-gray-200 p-2 cursor-pointer">
                    <PhotoIcon
                      onClick={() => fileInputRef.current.click()}
                      style={{ color: "#3182ce" }}
                    />
                  </span>
                </div>
                <div className="mr-0 ml-auto">
                  <button
                    className="bottom-0  bg-blue-700 text-white px-8 py-4 rounded-md"
                    type="submit"
                    onClick={() => {
                      // postTweet(user.uid, tweet, imgLink);
                      // new post tweet -> finel pload, org postTweet()
                      // get file from state upload and get link
                      async function postTweetandUploadFile() {
                        if (file) {
                          await uploadFile();
                        }
                        postTweet(user.uid, tweet, imgLink);
                        setFile(null);
                        setTweet("");
                        setImgLink(null);
                      }
                      postTweetandUploadFile();
                    }}>
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetInput;
