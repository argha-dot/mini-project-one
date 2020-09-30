import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/navbar/navbar.component"
import Product from "./components/product/product.component"
import Homepage from "./components/homepage/homepage.component"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends Component  {
  render() {
    return (
      <Router>
        <div className="main">
          <NavBar />
          <br />
          <Route path="/" exact component={Homepage} />
          <Route path="/product/:id" component={Product}/>
        </div>
      </Router>
    );
  }
}