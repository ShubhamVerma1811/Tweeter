const ExploreFilters = () => {
  return (
    <div
      className="w-full bg-white rounded-lg p-5"
      style={{ height: "max-content" }}>
      <li className="font-poppins font-semibold text-base  py-4 list-none text-primary">
        Top
      </li>
      <li className="font-poppins font-semibold text-base text-gray-600 py-4 list-none ">
        Latest
      </li>
      <li className="font-poppins font-semibold text-base text-gray-600 py-4 list-none ">
        People
      </li>
      <li className="font-poppins font-semibold text-base text-gray-600 py-4 list-none ">
        Media
      </li>
    </div>
  );
};

export default ExploreFilters;
