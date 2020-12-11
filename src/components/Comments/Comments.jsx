import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useEffect } from "react";
import Avatar from "../Avatar/Avatar";
import firebase from "firebase";

const Comments = ({ tweetID }) => {
  useEffect(() => {
    firebase.firestore();
  }, []);

  return (
    <div className="rounded-lg">
      <div className="flex flex-row">
        <div className="m-2">
          <Avatar src="" />
        </div>
        <div className="flex flex-col  w-full">
          <div className="bg-gray-200 p-4">
            <div className="p-2">
              <p className="inline-block font-poppins font-medium">
                Waqar Bloom
              </p>
              <p className="inline-block font-noto font-medium text-xs text-gray-600">
                24 August at 20:43{" "}
              </p>
            </div>
            <div className="p-2">
              <p className="font-noto text-gray-700">
                I’ve seen awe-inspiring things that I thought I’d never be able
                to explain to another person.
              </p>
            </div>
          </div>
          <div className="flex flex-row py-4">
            <button type="submit">
              <span>
                <FavoriteBorderIcon />
              </span>
              Like
            </button>
            <p className="px-2">.</p>
            <p className="font-noto font-semibold text-gray-400">12k Likes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
