// src/pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbars';

export default function Home () {

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    window.scrollTo(0,0);
    document.body.classList.add("home-page");
    return function cleanup() {
      document.body.classList.remove("home-page");
    };
  }, []);

  return (
    <section className="hero is-home-background is-fullheight">
      <div className="hero-head">
        <Navbar/>
      </div>
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-light is-1">
            Pizza Store
          </h1>
          <h2 className="subtitle is-styled-font has-text-warning">
            Delivery in seconds
          </h2>
        </div>
      </div>
    </section>
  );
};
