import "./Home.css";
import Nav from "../../components/Nav/Nav.jsx";
import { OpenBoxContext, PageContext } from "../../context/context";
import { useContext, useEffect } from "react";

const Home = () => {
  const { page, setPage } = useContext(PageContext);
  const { openBox, setOpenBox } = useContext(OpenBoxContext);

  useEffect(() => {
    setPage("Home");
    setOpenBox(false);
  }, []);

  return (
    <>
      <h1>Home</h1>
      <Nav page={page} />
    </>
  );
};

export default Home;
