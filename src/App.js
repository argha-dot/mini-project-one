import React, { Component } from 'react';
import NavBar from "./components/navbar/navbar.component"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends Component  {
  render() {
    return (
      <div className="main">
        <NavBar>
        </NavBar>
      </div>
    );
  }
}