import React, { Component } from 'react'; 
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';

// Redux imports:
import { connect } from 'react-redux';
import { login, logout } from './redux/reducer';



// Component Imports
import NavBar from "./components/navbar/navbar.component"
import Product from "./components/product/product.component"
import Dashboard from "./components/dashboard/dashboard.component"

// CSS Imports
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
          <Route path="/" exact component={Dashboard} />
          <Route path="/product" component={Product} />
        </div>
    );
  }
}

export default withRouter(connect()(App)); //Connecting app with reducer