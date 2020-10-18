import React, { Component, useState, useEffect } from "react";
import ProductPage from '../product/product.component';
import SelectSearch, {useSelect} from 'react-select-search';
import SearchBar from './searchbar';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { GoogleLogin, GoogleLogout, useGoogleLogin } from 'react-google-login';
// CSS Imports: 
import { Navbar } from "react-bootstrap"
import "./navbar.component.css"

export default function NavBar(props) {


  const [sidebarToggle, setToggle] = useState(true);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
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
  
  const linkFunc = (path) => {
    this.props.history.push(path);
  }
  // const { signIn, loaded } = useGoogleLogin({});

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
        <form className="form-main">
          <input placeholder="Search" type="text" className="search-form" onChange={e => setSearch(e.target.value)} />
          <button className="search-btn"><i className="fas fa-search"></i></button>
          {
            filteredProducts.map(pro => {
              console.log(pro)
              return (
                <div className="form-main-result">
                  {pro.name}
                </div>
              )
            })
          }
        </form>

        <div className="right-side">
          <button className="cart-btn"><i className="fas fa-shopping-cart fa-lg"></i></button>
          {auth_button}
        </div>
      </Navbar>
    </div>
  )
}


// const mapStateToProps = state => {
//   return {
//     user: state.user
//   }
// }
// //Then wrap our Component with the HOC, and the connect double invoked. 
// export default withRouter(connect(mapStateToProps)(NavBar));
// export default withRouter(connect(mapStateToProps)(NavBar));
// export default NavBar;