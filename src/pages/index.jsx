import AuthForm from "../components/AuthForm/AuthForm";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center bg-blue-400 h-screen">
        <div className="lg:w-2/4 w-full h-full">
          <div className="w-full h-full bg-logo bg-no-repeat bg-cover bg-top flex flex-col justify-center">
            <h1 className="text-white font-poppins font-semibold mx-auto">
              See what's happening!
            </h1>
          </div>
        </div>
        <div className="lg:w-2/4 bg-blue-800 py-6">
          <div className="mx-6">
            <div className="my-4">
              <img src="/images/logos/tweeter-light.svg" alt="logo" />
            </div>
            <div className="m-auto">
              <AuthForm type="signIn" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
