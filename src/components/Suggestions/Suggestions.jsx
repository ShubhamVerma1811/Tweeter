import Avatar from "../Avatar/Avatar";

const Suggestions = () => {
  return (
    <div
      className="bg-white w-full p-5 rounded-lg"
      style={{ height: "max-content" }}
    >
      <p className="font-poppins font-semibold text-base mb-3">Who to Follow</p>
      <hr />
      <div>
        <div className="flex flex-row my-4">
          <div className="w-10 mr-4">
            <Avatar src="https://uifaces.co/our-content/donated/gPZwCbdS.jpg" />
          </div>
          <div className="flex flex-col">
            <p className="font-poppins font-medium">Mikael Stanley</p>
            <p className="font-noto font-medium text-sm text-gray-600">
              230k followers
            </p>
          </div>
          <button
            className="bg-primary mr-0 ml-auto text-white px-8 py-4 rounded-md lg:px-4 lg:py-2"
            type="submit"
          >
            Follow
          </button>
        </div>
        <div>
          <p className="font-noto font-medium text-gray-600 my-4">
            Photographer & Filmmaker based in Copenhagen, Denmark
          </p>
        </div>
        <div
          className="overflow-hidden rounded-lg"
          style={{
            height: "100px",
            maxHeight: "300px",
          }}
        >
          <img
            className="w-full"
            src="https://images.unsplash.com/photo-1522439748419-3cd697a86028?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            alt="banner"
          />
        </div>
      </div>
      <hr className="my-4" />

      <div>
        <div className="flex flex-row my-4">
          <div className="w-10 mr-4">
            <Avatar src="https://uifaces.co/our-content/donated/gPZwCbdS.jpg" />
          </div>
          <div className="flex flex-col">
            <p className="font-poppins font-medium">Mikael Stanley</p>
            <p className="font-noto font-medium text-sm text-gray-600">
              230k followers
            </p>
          </div>
          <button
            className="bg-primary mr-0 ml-auto text-white px-8 py-4 rounded-md"
            type="submit"
          >
            Follow
          </button>
        </div>
        <div>
          <p className="font-noto font-medium text-gray-600 my-4">
            Photographer & Filmmaker based in Copenhagen, Denmark
          </p>
        </div>
        <div
          className="overflow-hidden rounded-lg"
          style={{
            height: "100px",
            maxHeight: "300px",
          }}
        >
          <img
            className="w-full"
            src="https://images.unsplash.com/photo-1522439748419-3cd697a86028?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            alt="banner"
          />
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
