// React Imports: 
import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import axios from 'axios';

// CSS Imports: 
import { Navbar } from "react-bootstrap"
import "./navbar.component.css"

export default function NavBar(props) {

  const [sidebarToggle, setToggle] = useState(true);
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [display, setDisplay] = useState(false);
  const [userDisplay, setUserDisplay] = useState(false);
  const wrapperRef = useRef(null);
  const [user, setUser] = useState(null);
  

  const fetchData = () => {
    axios.get(`http://localhost:5000/api/products/`)
      .then((response) => {
        // console.log(`reponse from category: ${response}`)
        setProductList(response.data.products)
      })
      .catch(err => console.log(`${err} from navbar.component frontend`))
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, [])

  useEffect(() => {
    setFilteredProducts(
      productList.filter(product => {
        return (product.name.toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase()))
      })
    )
  }, [search, productList])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  const handleClickOutside = (event) => {
    const {current: wrap} = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  }
  
  const linkFunc = (path) => {
    this.props.history.push(path);
  }

  const sideOpen = () => {
    if (sidebarToggle) {
      document.querySelector(".sidebar").classList.add("open");
      document.querySelector(".my-bar").classList.add("open");
    } else {
      document.querySelector(".sidebar").classList.remove("open");
      document.querySelector(".my-bar").classList.remove("open");
    }
    setToggle(!sidebarToggle);
  }

  // console.log("Var Outside: ", props.isSignedIn)

  // Google auth buttons copied from npm google login button website

  var auth_button_style = {
    "backgroundColor": "#76f3e4",
    "border": "none",
    "color": "black"

  }

  var auth_button_loggedOut = 
  <div className="log-container">
    <GoogleLogin
      clientId="324694862893-7rthjc44uda4smoddu16vqqtnfiofbuf.apps.googleusercontent.com"
      render={renderProps => (
        <button style={auth_button_style} onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</button>
      )}
      buttonText="Login with Google"
      onSuccess={props.sucessfulResponseGoogle}
      onFailure={props.failedResponseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  </div>
  
  var auth_button_loggedIn = 
    <div className="log-container">
      <Link to="/profile" className="log-profile">Go to profile</Link>
      <GoogleLogout
        clientId="324694862893-7rthjc44uda4smoddu16vqqtnfiofbuf.apps.googleusercontent.com"
        render={renderProps => (
          <button style={auth_button_style} onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</button>
        )}
        buttonText="Logout"
        onLogoutSuccess={props.logoutSuccess}
      >
      </GoogleLogout>
    </div>
  
  return ( 
    <div className="nav-main">
      
      <Navbar fixed="top" style={{ "justifyContent": "space-between", "padding": "0.5rem 0.5rem" }}>

        <div className="left-side">
          <button
            className="my-bar" onClick={sideOpen}>
            <i className="fas fa-bars" style={{ "fontSize": "1.5rem" }}></i>
          </button>

          <span className="navbar-brand">
            <Link to="/" className="nav-link">SHOP</Link>
          </span>
        </div>
        <form ref={wrapperRef} className="form-main">
          <div className="search-bar">
            <input
              className="search-form"
              placeholder="Search"
              type="text"
              onChange={e => setSearch(e.target.value)}
              onClick={() => { setDisplay(!display) }} />
            <button disabled={true} className="search-btn"><i className="fas fa-search"></i></button>
          </div>
          {
            display && search.length >= 2 && (
              <div className="search-result-container">
                {filteredProducts.map(pro => {
                  return (
                    <Link 
                      // to={`/product/${pro._id}`} 
                      to={{
                        pathname:`/product/${pro._id}`,
                        state: {
                          user: props.user
                        }
                      }}
                      className="form-main-result" 
                      key={pro._id}
                      style={{ color: "rgb(255, 255, 255)" }}>
                      {pro.name}
                    </Link>
                  )
                })}
              </div>
            )
          }
        </form>

        <div className="right-side">

          <Link to="/cart" className="cart-btn">
            <div className="cart-number">{props.user ? props.user.cart.length:0}</div>
            <svg className="shopping-cart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M478.4 297.7l33.4-200.3c0.8-4.8-0.6-9.8-3.7-13.5s-7.8-5.9-12.7-5.9H123.5L111 13.5C109.5 5.7 102.6 0 94.6 0H16.7C7.5 0 0 7.5 0 16.7s7.5 16.7 16.7 16.7h64.1L93.5 97.8c0 0 0 0 0 0l19.3 100.4 32.2 166.7c1.5 7.9 8.3 13.5 16.3 13.5h300.5c9.2 0 16.7-7.5 16.7-16.7s-7.5-16.7-16.7-16.7H175.2l-6.5-33.4h293.2C470.1 311.7 477 305.8 478.4 297.7zM162.2 278.3l-32.3-167h345.7L447.8 278.3H162.2z" /><path d="M217 411.8c-27.6 0-50.1 22.5-50.1 50.1S189.4 512 217 512c27.6 0 50.1-22.5 50.1-50.1S244.7 411.8 217 411.8zM217 478.6c-9.2 0-16.7-7.5-16.7-16.7s7.5-16.7 16.7-16.7c9.2 0 16.7 7.5 16.7 16.7S226.2 478.6 217 478.6z" /><path d="M406.3 411.8c-27.6 0-50.1 22.5-50.1 50.1S378.6 512 406.3 512s50.1-22.5 50.1-50.1S433.9 411.8 406.3 411.8zM406.3 478.6c-9.2 0-16.7-7.5-16.7-16.7s7.5-16.7 16.7-16.7 16.7 7.5 16.7 16.7S415.5 478.6 406.3 478.6z" /><path d="M306.1 144.7c-9.2 0-16.7 7.5-16.7 16.7v66.8c0 9.2 7.5 16.7 16.7 16.7s16.7-7.5 16.7-16.7v-66.8C322.8 152.2 315.3 144.7 306.1 144.7z" /><path d="M406.3 144.7c-9.2 0-16.7 7.5-16.7 16.7v66.8c0 9.2 7.5 16.7 16.7 16.7s16.7-7.5 16.7-16.7v-66.8C423 152.2 415.5 144.7 406.3 144.7z" /><path d="M205.9 144.7c-9.2 0-16.7 7.5-16.7 16.7v66.8c0 9.2 7.5 16.7 16.7 16.7 9.2 0 16.7-7.5 16.7-16.7v-66.8C222.6 152.2 215.1 144.7 205.9 144.7z" /></svg>
          </Link>
          <div className="user-dropdown">
            <button 
              className="usr-btn"
              onClick={() => setUserDisplay(!userDisplay)}>
              {console.log("User from navbar", props.user)}
              {(props.user) ? <img className="nav-profile-pic" src={props.user["profile_picture"]}></img> : <i className="fas fa-user fa-lg"></i>}
            </button>
            {
              userDisplay && (
                <div className="sign-in-out">
                  <Link to="/wish" className="cart-button" style={{ backgroundColor: "crimson" }}><i className="fas fa-heart"></i></Link>
                  {(props.user) ? auth_button_loggedIn : auth_button_loggedOut}
                </div>
              )
            }
          </div>
        </div>
      </Navbar>
    </div>
  )
}
