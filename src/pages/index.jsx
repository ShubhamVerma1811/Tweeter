import AuthForm from "../components/AuthForm/AuthForm";

const Home = () => {
  return (
    <div className="flex justify-center items-center">
      <div className=" h-full w-full mx-6 md:mx-24 xl:mx-64">
        <img src="/images/logos/tweeter-light.svg" alt="" />
        <div className="m-auto">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};
export default Home;
