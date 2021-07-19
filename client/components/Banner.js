import React, { Component } from "react";
import Navbar from "./Navbar";

class Banner extends Component {
  render() {
    return (
      <div id="banner">
        <img
          id="banner-logo"
          src="https://i.imgur.com/qqgpF0k.png"
          alt="cache-22-pink logo"
        />
        <div id="navbar">
          <Navbar />
        </div>
      </div>
    );
  }
}

export default Banner;
