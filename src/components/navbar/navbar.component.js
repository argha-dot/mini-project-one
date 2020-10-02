import React, { Component } from "react";
import { Navbar } from "react-bootstrap"
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

    return(
      <div className="nav-main">
        <Navbar fixed="top" style={{ "justifyContent": "space-between", "padding": "0.5rem 0.5rem" }}>

          <div className="left-side">
            <button
              className="my-bar" onClick={this.sideOpen}>
              <i class="fas fa-bars" style={{ "font-size": "1.5rem" }}></i>
            </button>

            <span class="navbar-brand">
              <Link to="/" className="nav-link">SHOP</Link>
            </span>

            <form class="form-main">
              <input placeholder="Search" type="text" className="search-form" />
              <button class="search-btn"><i class="fas fa-search"></i></button>
            </form>

          </div>

          <div className="right-side">
            <button className="cart-btn"><i className="fas fa-shopping-cart fa-lg"></i></button>
            <button className="my-btn"><i class="fas fa-user fa-lg"></i></button>
          </div>
        </Navbar>
        
        <nav className="sidebar">
          <ul className="sidebar-nav">
            <Link to="/" className="side-item">
              <i className="fas fa-home"></i>
              <span className="link-text">Home</span>
            </Link>

            <Link to="/" className="side-item">
              <svg className="fas" enable-background="new 0 0 512 512" height="25" viewBox="0 0 512 512" width="25" xmlns="http://www.w3.org/2000/svg"><path d="m496 0h-480c-8.836 0-16 7.164-16 16v480c0 8.836 7.164 16 16 16h480c8.837 0 16-7.164 16-16v-480c0-8.836-7.163-16-16-16zm-16 480h-448v-16h16c8.836 0 16-7.164 16-16s-7.164-16-16-16h-16v-16h16c8.836 0 16-7.164 16-16s-7.164-16-16-16h-16v-16h16c8.836 0 16-7.164 16-16s-7.164-16-16-16h-16v-16h16c8.836 0 16-7.164 16-16s-7.164-16-16-16h-16v-160h16c8.836 0 16-7.164 16-16s-7.164-16-16-16h-16v-16h16c8.836 0 16-7.164 16-16s-7.164-16-16-16h-16v-16h448z" /><path d="m240 192c-8.836 0-16 7.164-16 16s7.164 16 16 16h18.752c4.829 13.615 15.633 24.419 29.248 29.248v18.752c0 8.836 7.163 16 16 16s16-7.164 16-16v-16h32v16c0 8.836 7.163 16 16 16s16-7.164 16-16v-18.752c13.615-4.829 24.419-15.633 29.248-29.248h18.752c8.837 0 16-7.164 16-16s-7.163-16-16-16h-16v-31h16c8.837 0 16-7.164 16-16s-7.163-16-16-16h-18.413c-4.646-14.084-15.641-25.301-29.587-30.248v-18.752c0-8.836-7.163-16-16-16s-16 7.164-16 16v16h-32v-16c0-8.836-7.163-16-16-16s-16 7.164-16 16v18.752c-13.946 4.946-24.94 16.164-29.587 30.248h-18.413c-8.836 0-16 7.164-16 16s7.164 16 16 16h16v31zm48-48c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v64c0 8.822-7.178 16-16 16h-64c-8.822 0-16-7.178-16-16z" /><path d="m240 352h192c8.837 0 16-7.164 16-16s-7.163-16-16-16h-192c-8.836 0-16 7.164-16 16s7.164 16 16 16z" /><path d="m240 416h16v16c0 8.836 7.163 16 16 16s16-7.164 16-16v-16h32v16c0 8.836 7.163 16 16 16s16-7.164 16-16v-16h32v16c0 8.836 7.163 16 16 16s16-7.164 16-16v-16h16c8.837 0 16-7.164 16-16s-7.163-16-16-16h-192c-8.836 0-16 7.164-16 16s7.164 16 16 16z" /><path d="m112 208c8.836 0 16-7.164 16-16v-112c0-8.836-7.164-16-16-16s-16 7.164-16 16v112c0 8.836 7.164 16 16 16z" /><path d="m176 272c8.836 0 16-7.164 16-16v-176c0-8.836-7.164-16-16-16s-16 7.164-16 16v176c0 8.836 7.164 16 16 16z" /><path d="m112 448h32c8.836 0 16-7.164 16-16s-7.164-16-16-16h-32c-8.836 0-16 7.164-16 16s7.164 16 16 16z" /><path d="m112 384h32c8.836 0 16-7.164 16-16s-7.164-16-16-16h-32c-8.836 0-16 7.164-16 16s7.164 16 16 16z" /><path d="m112 320h32c8.836 0 16-7.164 16-16s-7.164-16-16-16h-32c-8.836 0-16 7.164-16 16s7.164 16 16 16z" /></svg>
              <span className="link-text">Motherboard</span>
            </Link>

            <Link to="/" className="side-item">
              <i class="uil uil-processor"></i>
              <span className="link-text">CPU</span>
            </Link>

            <Link to="/" className="side-item">
              <i class="fas fa-hdd"></i>
              <span className="link-text">Storage</span>
            </Link>
            
            <Link to="/" className="side-item">
              <i class="fas fa-plug"></i>
              <span className="link-text">Power Unit / Cooling</span>
            </Link>

            <Link to="/" className="side-item">
              <i class="fas fa-memory"></i>
              <span className="link-text">Memory</span>
            </Link>

            <Link to="/product/mac" className="side-item">
              <i class="fas fa-tv"></i>
              <span className="link-text">Monitors</span>
            </Link>

            <Link to="/" className="side-item">
              <i className="fas fa-keyboard"></i>
              <span className="link-text">Keyboards</span>
            </Link>

            <Link to="/product/gameboy" className="side-item">
              <svg className="fas" enable-background="new 0 0 512 512" height="25" viewBox="0 0 512 512" width="25" xmlns="http://www.w3.org/2000/svg"><g><path d="m60 481h30v-60h61v60h330v-60h31v-330h-422v-60h-90v30h60v60h-60v120h60v30h-60v120h60zm121-60h30v30h-30zm210 0v30h-30v-30zm-60 30h-30v-30h30zm-60 0h-30v-30h30zm180 0h-30v-30h30zm31-330v270h-392v-270zm-452 90v-60h30v60zm0 150v-60h30v60z" /><path d="m346 361c57.897 0 105-47.103 105-105s-47.103-105-105-105-105 47.103-105 105 47.103 105 105 105zm-70.376-79.073c5.973 1.447 12.803 2.394 20.496 2.394 4.426 0 9.145-.324 14.134-1.029 7.877 10.293 20.086 17.096 33.882 17.661 1.07 14.46-2.595 24.284-5.558 29.677-29.001-2.863-53.2-22.31-62.954-48.703zm70.376-10.927c-8.271 0-15-6.729-15-15s6.729-15 15-15 15 6.729 15 15-6.729 15-15 15zm25.926 55.376c2.28-9.407 3.284-20.972 1.356-34.623 10.298-7.877 17.104-20.089 17.67-33.889 14.459-1.07 24.284 2.595 29.677 5.558-2.862 29.002-22.31 53.2-48.703 62.954zm44.45-96.302c-9.407-2.28-20.972-3.284-34.623-1.356-7.877-10.297-20.089-17.104-33.888-17.67-1.07-14.46 2.595-24.284 5.558-29.677 29.001 2.862 53.199 22.309 62.953 48.703zm-96.302-44.45c-2.28 9.407-3.284 20.972-1.356 34.623-10.298 7.877-17.104 20.089-17.67 33.888-14.459 1.07-24.284-2.595-29.677-5.558 2.862-29.001 22.31-53.199 48.703-62.953z" /><path d="m121 151h30v30h-30z" /><path d="m181 151h30v30h-30z" /><path d="m121 211h30v30h-30z" /><path d="m181 211h30v30h-30z" /><path d="m121 271h30v30h-30z" /><path d="m181 271h30v30h-30z" /><path d="m121 331h30v30h-30z" /><path d="m181 331h30v30h-30z" /></g></svg>
              <span className="link-text">Graphics Card</span>
            </Link>

            <Link to="/product/gameboy" className="side-item">
              <i className="fas fa-gamepad"></i>
              <span className="link-text">For Gamers</span>
            </Link>

            <Link to="/product/gameboy" className="side-item">
              <svg className="fas" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" height="25" width="25"><path d="m368 0h-224c-26.47 0-48 21.53-48 48v416c0 26.47 21.53 48 48 48h224c26.47 0 48-21.53 48-48v-416c0-26.47-21.53-48-48-48zm-112 384c17.64 0 32 14.35 32 32s-14.36 32-32 32-32-14.35-32-32 14.36-32 32-32zm-16-32v-16c0-8.84 7.16-16 16-16s16 7.16 16 16v16c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-64-64c-8.84 0-16-7.16-16-16v-64c0-8.84 7.16-16 16-16h160c8.84 0 16 7.16 16 16v64c0 8.84-7.16 16-16 16zm176-144c0 8.84-7.16 16-16 16h-160c-8.84 0-16-7.16-16-16v-64c0-8.84 7.16-16 16-16h160c8.84 0 16 7.16 16 16z" /><path d="m192 96h128v32h-128z" /><path d="m192 224h128v32h-128z" /></svg>
              <span className="link-text">Cabinets</span>
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