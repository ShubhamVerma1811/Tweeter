import NavBar from "../components/NavBar/NavBar";

const Layout = (props) => {
  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
};

export default Layout;
