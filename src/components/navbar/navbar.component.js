import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import axios from 'axios';

// CSS Imports: 
import { Button, Navbar, Form, FormControl } from "react-bootstrap"
import "./navbar.component.css"




export class NavBar extends Component {
  
  // constructor(props) {
  //   super(props) 
  //   this.state = {
  //     sidebarToggle: true,
  //   }
  // }

  linkFunc(path) {
    this.props.history.push(path);
}

  // sideOpen = () => {
  //   if (this.state.sidebarToggle) {
  //     document.querySelector(".sidebar").classList.add("open");
  //     document.querySelector(".my-bar").classList.add("open");
  //   } else {
  //     document.querySelector(".sidebar").classList.remove("open");
  //     document.querySelector(".my-bar").classList.remove("open");
  //   }
  //   this.setState({
  //     sidebarToggle: !this.state.sidebarToggle,
  //   })
  // }

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
    console.log("User Props:", this.props.user);
    var cartBtn = {
      "backgroundColor": "whitesmoke", 
      "border": "none", 
      "height": "3.25rem", 
      "borderRadius": "0px"
    }


    return(
      <div className="nav-main">
        <Navbar fixed="top" style={{ "justifyContent": "space-between", "padding": "0.5rem 0.5rem" }}>
          
          <div className="left-side">
            {/* <button 
              className="my-bar" onClick={this.sideOpen}>
              <i className="fas fa-bars" style={{ "fontSize": "1.5rem" }}></i>
            </button> */}

            <Navbar.Brand>
              <h2 style={{ color: "whitesmoke" }}>
                <Link to="/" className="nav-link">SHOP</Link>
              </h2>
            </Navbar.Brand>

            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-dark" style={{ color: "whitesmoke", borderColor: "whitesmoke" }}>Search</Button>
            </Form>

          </div>

          <div className="right-side">
            <Button variant="dark" style={cartBtn}><i className="fas fa-shopping-cart"></i></Button>
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
        
        <nav className="sidebar">
          <ul className="sidebar-nav">
            <Link to="/" className="side-item">
              <i className="fas fa-home"></i>
              <span className="link-text">Home</span>
            </Link>
            
            <Link to="/" className="side-item">
              <i className="fas fa-mobile"></i>
              <span className="link-text">Mobile</span>
            </Link>

            <Link to="/" className="side-item">
              <i className="fas fa-headphones"></i>
              <span className="link-text">Headphones</span>
            </Link>

            <Link to="/" className="side-item">
              <i className="fas fa-laptop"></i>
              <span className="link-text">Laptops</span>
            </Link>

            <Link to="/" className="side-item">
              <i className="fas fa-keyboard"></i>
              <span className="link-text">Keyboards</span>
            </Link>

            <Link to="/product" className="side-item">
              <i className="fas fa-gamepad"></i>
              <span className="link-text">For Gamers</span>
            </Link>

            <a target="_blanck" href="https://blacklivesmatter.com/" className="side-item">
              <i className="fas fa-helicopter"></i>
              <span className="link-text">Support</span>
            </a>

            <Link to="/" className="side-item">
              <i className="fas fa-cogs"></i>
              <span className="link-text">Settings</span>
            </Link>

          </ul>

        </nav>
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

 