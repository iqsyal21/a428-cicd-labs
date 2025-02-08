import React from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <h1>Welcome to React 🚀</h1>
      </header>

      <p className="intro">
        Edit <code>src/App.js</code> and save to reload.
      </p>

      <button className="btn">Get Started</button>
    </div>
  );
};

export default App;
