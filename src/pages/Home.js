import React from "react";
import Header from "../components/header/Header";
import Main from "../components/main/Main";
import Footer from "../components/footer/Footer";
import About from "./About";
import GalleryPage from "./GalleryPage";
import Welcome from "./Welcome.js";
import Reg from "./Reg.js";
import { useLocation } from "react-router-dom";
import GalleryPageUserGuest from "./GallaryPageUserGuest.js";

const Home = () => {
  const location = useLocation();
  const userId = location.state?.userId || "guest";
  console.log(userId);
  console.log("Location State:", location.state);

  const userName = location.state?.userName || "";

  const mainContent = [];

  mainContent.push(<Welcome key="welcome" userId={userId} />);
  mainContent.push(<About key="about" userId={userId} />);

  if (userId === "guest") {
    mainContent.push(<GalleryPageUserGuest key="galleryGuest" userId={userId} />);
    mainContent.push(<Reg key="reg" />); 
  }
  else {
    mainContent.push(<GalleryPage key="gallery" userId={userId} />);
  }

  return (
    <>
      <Header userName={userName} userId={userId} />
      {/* <Main content={mainContent} /> */}
      <Footer userId={userId} />
    </>
  );
}
export default Home;
