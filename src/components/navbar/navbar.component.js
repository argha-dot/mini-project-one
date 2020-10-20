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
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [display, setDisplay] = useState(false);
  const wrapperRef = useRef(null);
  
  const fetchData = () => {
    axios.get(`/api/products/`)
      .then((response) => {
        console.log(`reponse from category: ${response}`)
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

  var auth_button;
  console.log("Var Outside: ", props.isSignedIn)

  // Google auth buttons copied from npm google login button website
  if (props.isSignedIn) {
    auth_button = <GoogleLogout
      clientId="741634897739-ac07i81bga1jtqdg7lqfk98tt71m76h5.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={props.logoutSuccess}
    >
    </GoogleLogout>
  } else {
    auth_button = <GoogleLogin
      clientId="741634897739-ac07i81bga1jtqdg7lqfk98tt71m76h5.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={props.sucessfulResponseGoogle}
      onFailure={props.failedResponseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  }
  

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

        <div className="right-side">
          <Link to="/cart" className="cart-btn"><i className="fas fa-shopping-cart fa-lg"></i></Link>
          {auth_button}
        </div>
      </Navbar>
    </div>
  )
}
