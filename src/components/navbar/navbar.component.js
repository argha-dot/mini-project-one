import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import axios from 'axios';

// CSS Imports: 
import { Navbar} from "react-bootstrap"
import "./navbar.component.css"




export class NavBar extends Component {
  
  constructor(props) {
    super(props) 
    this.state = {
      sidebarToggle: true,
    }
  }

  linkFunc(path) {
    this.props.history.push(path);
}

  sideOpen = () => {
    if (this.state.sidebarToggle) {
      document.querySelector(".sidebar").classList.add("open");
      document.querySelector(".my-bar").classList.add("open");
    } else {
      document.querySelector(".sidebar").classList.remove("open");
      document.querySelector(".my-bar").classList.remove("open");
    }
    this.setState({
      sidebarToggle: !this.state.sidebarToggle,
    })
  }

  login = () => {
    const redirectURI = encodeURIComponent(`${window.location.origin}/auth/callback`);
    window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/login?client=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectURI}`;
  }

  logout = () => {
    axios.post('/api/logout', {})
    .then(res => {
      alert(res.data.message);
      this.props.history.go(); //Refresh the browser
    }).catch(err => console.log("Error from Navbar logout: ", err));
  }



  render() {
      return(
      <div className="nav-main">
        <Navbar fixed="top" style={{ "justifyContent": "space-between", "padding": "0.5rem 0.5rem" }}>

          <div className="left-side">
            <button
              className="my-bar" onClick={this.sideOpen}>
              <i className="fas fa-bars" style={{ "fontSize": "1.5rem" }}></i>
            </button>

            <span className="navbar-brand">
              <Link to="/" className="nav-link">SHOP</Link>
            </span>

            <form className="form-main">
              <input placeholder="Search" type="text" className="search-form" />
              <button className="search-btn"><i className="fas fa-search"></i></button>
            </form>

          </div>

          <div className="right-side">
            <Link to="/cart" className="cart-btn"><i className="fas fa-shopping-cart fa-lg"></i></Link>
            <button
              className="my-btn"
              onClick={() => this.props.user ? this.logout() : this.login()}>
            {this.props.user ?
            <div> 
              <p> Sign Out </p>
              {/*Define user image here.*/}
            </div>
            : <p> Sign In</p> }
            </button>
          </div>
        </Navbar>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
      user: state.user
  }
}
//Then wrap our Component with the HOC, and the connect double invoked. 
export default withRouter(connect(mapStateToProps)(NavBar));
