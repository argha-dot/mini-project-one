import React, { Component } from 'react'; 
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import Auth from "./hoc/auth";

// Redux imports:
import { connect } from 'react-redux';
import { login, logout } from './redux/reducer';

// Component Imports
import NavBar from "./components/navbar/navbar.component"
import Product from "./components/product/product.component"
import Homepage from "./components/homepage/homepage.component"

// Aarav edits: 
import LandingPage from "./components/landing_page"

import Category from "./components/category/category.component"
import Cart from "./components/cart/cart.component";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

 
export class App extends Component  {
  componentDidMount() {
    console.log("Callback Result");
    axios.get('http://localhost:5000/api/users/read-user-data')
    .then(res => {
      console.log("Callback Result - 2");
      const {dispatch} = this.props; // Destructing dispatch to initiate actions
      if (res.data.user) {
        dispatch(login(res.data.user)); 
      } else {
        dispatch(logout());
      }
    }).catch(err => console.log("Error from callback result: ", err)); 
  }

  render() {
    return (
        <div className="main">
          <NavBar />
          <br />
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/product/:_id" component={Product}/>
          <Route path="/category" component={Category} />
          <Route path="/cart" component={Cart} />
        </div>
    );
  }
}

export default withRouter(connect()(App)); //Connecting app with reducer