// TODO Fix the footer thing. 

import React, { Component } from 'react'; 
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';

// Redux imports:
import { connect } from 'react-redux';
import { login, logout } from './redux/reducer';

// Component Imports
import NavBar from "./components/navbar/navbar.component"
import Product from "./components/product/product.component"
import Homepage from "./components/homepage/homepage.component"
import Category from "./components/category/category.component"
import Cart from "./components/cart/cart.component";
import Wish from "./components/wish/wish.component";
// import Footer from "./components/footer/footer.component"
import Sidebar from "./components/sidebar/sidebar.component"
import Profile from "./components/profile/profile.component"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 


export class App extends Component  {
  componentDidMount() {
    axios.get('/api/user-data')
    .then(res => {
      const {dispatch} = this.props; // Destructing dispatch to initiate actions
      if (res.data.user) {
        dispatch(login(res.data.user)); 
      } else {
        dispatch(logout());
      }
    }) 
  }

  render() {
    return (
        <div className="main">
          <NavBar />
          <br />
          <Route path="/" exact component={Homepage} />
          <Route path="/product/:id" component={Product}/>
          <Route path="/category" component={Category} />
          <Route path="/cart" component={Cart} />
          <Route path="/wish" component={Wish} />
          <Route path="/profile" component={Profile} />
          {/* <Footer /> */}
          <Sidebar />
        </div>
    );
  }
}

export default withRouter(connect()(App)); //Connecting app with reducer