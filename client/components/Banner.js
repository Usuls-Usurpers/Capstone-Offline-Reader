import React, { Component } from 'react';
import Navbar from './Navbar';

class Banner extends Component {
  render() {
    return (
      <div id="banner">
        <img
          id="banner-logo"
          src="https://i.imgur.com/Rxt2ajK.png"
          alt="cache-22-pink logo"
        />
        <p>Cache-22</p>
        <Navbar />
      </div>
    );
  }
}

export default Banner;
