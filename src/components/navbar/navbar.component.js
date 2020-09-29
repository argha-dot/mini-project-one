import React, { Component } from "react";
import { Button, Navbar, Form, FormControl } from "react-bootstrap"
import { Link } from 'react-router-dom';
import "./navbar.component.css"

export default class NavBar extends Component {
  
  constructor(props) {
    super(props) 
    this.state = {
      sidebarToggle: true,
    }
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

  render() {

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
            <button 
              className="my-bar" onClick={this.sideOpen}>
              <i className="fas fa-bars" style={{ "fontSize": "1.5rem" }}></i>
            </button>

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
            <button className="my-btn">Sign In</button>
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

            <Link to="/product/mac" className="side-item">
              <i className="fas fa-laptop"></i>
              <span className="link-text">Laptops</span>
            </Link>

            <Link to="/" className="side-item">
              <i className="fas fa-keyboard"></i>
              <span className="link-text">Keyboards</span>
            </Link>

            <Link to="/product/gameboy" className="side-item">
              <i className="fas fa-gamepad"></i>
              <span className="link-text">For Gamers</span>
            </Link>

            <a target="_blanck" href="https://blacklivesmatter.com/" className="side-item">
              <i className="fas fa-helicopter"></i>
              <span className="link-text">Kobe</span>
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