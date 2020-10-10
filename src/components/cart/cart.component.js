import React, { Component } from "react";
// import { Link } from "react-router-dom";

import CartItem from "./item/item.cart.component";

import "./cart.component.css";

export default class Cart extends Component {
    render() {
        return (
            <div className="cart-main" style={{ color: "whitesmoke" }}>
                <h1 className="cart-title">Shopping Cart</h1>
                <div className="cart-contents">
                    <CartItem />
                    <CartItem />
                </div>
            </div>
        )
    }
}