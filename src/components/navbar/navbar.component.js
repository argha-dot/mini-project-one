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
    // const countries = ['India', 'Nepal', 'Bangladesh'];
    const countries = [
      {name: 'India', value: 'sv'},
      {name: 'Nepal', value: 'en'},
      {name: 'Bangladesh', value: 'bengali'}      
    ];
    const Search = () => {
      return (
        <SelectSearch
            options={countries}
            search
            placeholder="Select your country"
        />
      )
    }

  const dispatch = useDispatch();
  const [sidebarToggle, setToggle] = useState(true);
  const [isSignedIn, setSignedIn] = useState(false);
  const [userId, setUserID] = useState('');
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

  // const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  // console.log("Authentication Status: ", isAuthenticated);

  const logoutSuccess = () => {
    console.log("From Logout: ", userId)
    axios({
      method: "POST",
      url: "http://localhost:5000/api/google_logout",
      data: { userId: userId }
    }).then(res => {
      setSignedIn(false);
      setUser(null);
      // dispatch(logout());
    })
  }

  const sucessfulResponseGoogle = (response) => {
    axios({
      method: "POST",
      url: 'http://localhost:5000/api/google_login',
      data: { tokenId: response.tokenId }
    }).then(res => {
      console.log(res);
      setSignedIn(true);
      setUserID(res.data.user._id);
      setUser(res.data.user);
      console.log("Var inside: ", isSignedIn, res.data.user._id);
      // dispatch(login(res.data.user));
    })
      .catch(err => console.log("Error from succesfulResponseGoogle", err));
  }

  const failedResponseGoogle = (response) => {
    console.log("Here", response);
    setSignedIn(true);
  }

  var auth_button;
  console.log("Var Outside: ", isSignedIn)
  if (isSignedIn) {
    auth_button = <GoogleLogout
      clientId="741634897739-ac07i81bga1jtqdg7lqfk98tt71m76h5.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logoutSuccess}
    >
    </GoogleLogout>
  } else {
    auth_button = <GoogleLogin
      clientId="741634897739-ac07i81bga1jtqdg7lqfk98tt71m76h5.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={sucessfulResponseGoogle}
      onFailure={failedResponseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  }
  

  return (
    <div className="nav-main">
      <div>
        {/* {isSignedIn?console.log("user from navbar: ", user): console.log('')} */}
        {user? <ProductPage user={user} /> : null}
      </div>
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
          {/* <SelectSearch
              options={countries}
              search
              placeholder="Select your country"
            /> */}
          {/* {search} */}
          <input placeholder="Search" type="text" className="search-form" onChange={e => setSearch(e.target.value)} />
          <button className="search-btn"><i className="fas fa-search"></i></button>
          {
            filteredProducts.map(pro => {
              console.log(pro)
              return (
                <div>
                  {pro.name}
                </div>
              )
            })
          }
        </form>

        <div className="right-side">
          <button className="cart-btn"><i className="fas fa-shopping-cart fa-lg"></i></button>
          {auth_button}
          {/* <GoogleLogin
            clientId="741634897739-ac07i81bga1jtqdg7lqfk98tt71m76h5.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={sucessfulResponseGoogle}
            onFailure={failedResponseGoogle}
            cookiePolicy={'single_host_origin'}
        /> */}
        </div>
      </Navbar>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    user: state.user
  }
}
// //Then wrap our Component with the HOC, and the connect double invoked. 
// export default withRouter(connect(mapStateToProps)(NavBar));
// export default withRouter(connect(mapStateToProps)(NavBar));
// export default NavBar;