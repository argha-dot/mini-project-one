import React, { useEffect, useState, Component } from 'react'
import Axios from 'axios';
import "./homepage/homepage.component.css"

export default class LandingPage extends Component {
    constructor() {
        super();
        this.state ={
            products: [],
            user: ''
            // loading: true
        }
    }

    componentDidMount() {
        Axios.get('/api/products')
        .then(response => {
            console.log(response.data.success);
            if(response.data.success) {
                // console.log(response.data.products)
                this.setState({products: response.data.products});
            } else {
                alert("Data was not fetched");
            }
        }).catch(err => console.log('Read all products - Error',  err));

        Axios.get('/api/user-data')
        .then(response => {
            console.log(response.data.success); 
            if(response.data.success) {
                // console.log('Frontend User:', response.data.user)
                this.setState({user: response.data.user});
            } else {
                alert("User was not fetched");
            }
        }).catch(err => console.log('Read User - Error',  err));
            
    }; 

    render() {
        const {products, user} = this.state;
        return (
            <div className="homepage-main" style={{ color: "whitesmoke" }}>
                {/* {products.length ? products.map(product => <p>{product._id}</p>) : null} */}
                {user.length ? <p>user</p> : null}
            </div>
        )
    }
}
