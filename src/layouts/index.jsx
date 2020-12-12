import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";

const Layout = (props) => {
  return (
    <>
      <NavBar />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
