import "./Home.css";
import Nav from "../../components/Nav/Nav.jsx";
import { PageContext } from "../../context/context";
import { useContext, useEffect } from "react";

const Home = () => {
  const {page, setPage} = useContext(PageContext)

  useEffect(() => {
    setPage("Home")
  
  },[]);

  return (
    <>
    <h1>Home</h1>
    <Nav page = {page}/>
    </>
  )

};

export default Home;
