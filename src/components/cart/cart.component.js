import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import CartItem from "./item.cart.component";
import CartSide from "./side.cart.component";

import "./cart.component.css";

export default function Cart(props) {

    const [cartList, setCartList] = useState(null);
    const [user, setUser] = useState(props.user ? props.user : "");
    var total = 0;

    useEffect(() => {
        setUser(props.user ? props.user : "");
        axios({
            method: "GET",
            url: `http://localhost:5000/api/see_cart/${user._id}`
        })
        .then(response => {setCartList(response.data);})
        .catch(err => console.log("error from cart.comp Error: ", err))
    }, [cartList, user])

    // console.log("cartList from get cart: ", cartList);

    return (
        <div className="cart-main" style={{ color: "whitesmoke" }}>
            <h1 className="cart-title">Shopping Cart</h1>
            <br />
            <div className="cart-contents">
                {
                    cartList && cartList.cart.map((item) => { // cartList.cartData[index].price
                        total += item.quantity*Number(cartList.cartData[cartList.cart.indexOf(item)].price.replace(/\D/g, ''))
                        return (
                            <CartItem user={user} cartDetails={item} key={item.id}/>
                        )
                    })
                }
            </div>
            <CartSide user={user} total={total}></CartSide>
        </div>
    )
}