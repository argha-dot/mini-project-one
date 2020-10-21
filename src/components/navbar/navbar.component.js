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
  const [profileImage, setProfileImage] = useState(<i className="fas fa-user fa-lg"></i>)
  
  const fetchData = () => {
    axios.get(`/api/products/`)
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
                      to={`/product/${pro._id}`} 
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
        <Link to="/wish" className="cart-btn"><i className="fas fa-shopping-cart fa-lg"></i></Link>

        <div className="right-side">

          <Link to="/cart" className="cart-btn"><i className="fas fa-shopping-cart fa-lg"></i></Link>
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
