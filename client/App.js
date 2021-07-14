import React from "react";
import Routes from "./Routes";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";

const App = () => {
  return (
    <div>
      <Banner />
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
