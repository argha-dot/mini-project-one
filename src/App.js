import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/navbar/navbar.component"
import Product from "./components/product/product.component"
import Dashboard from "./components/dashboard/dashboard.component"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        Hello {user.name}{' '}
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log out
        </button>
      </div>
    ); 
  } else {
    return <button onClick={loginWithRedirect}>Log in</button>;
  }
}
export default App;


// export default class App extends Component  {
//   render() {
//     return (
//       <Router>
//         <div className="main">
//           <NavBar />
//           <br />
//           <Route path="/" exact component={Dashboard} />
//           <Route path="/product" component={Product} />
//         </div>
//       </Router>
//     );
//   }
// }