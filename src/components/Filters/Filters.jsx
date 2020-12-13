const Filters = () => {
  return (
    <div
      className="w-full bg-white rounded-lg p-5"
      style={{ height: "max-content" }}>
      <li className="font-poppins font-semibold text-base  py-4 list-none text-primary">
        Tweets
      </li>
      <li className="font-poppins font-semibold text-base text-gray-600 py-4 list-none ">
        Tweets & Replies
      </li>
      <li className="font-poppins font-semibold text-base text-gray-600 py-4 list-none ">
        Media
      </li>
      <li className="font-poppins font-semibold text-base text-gray-600 py-4 list-none ">
        Likes
      </li>
    </div>
  );
};

export default Filters;
