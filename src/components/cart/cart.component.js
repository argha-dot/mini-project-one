import React, { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "./item.cart.component";
import CartC from "../crud_cart";

import "./cart.component.css";

export default function Cart(props) {

    const [cartList, setCartList] = useState(null);
    const [userId, setUserId] = useState(props.user ? props.user._id : "")

    // var response = CartC( 'GET_CART_INFO', userId, "")
    useEffect(() => {
        setUserId(props.user ? props.user._id : "")
        setCartList(CartC('GET_CART_INFO', userId, ""))
    }, [userId, setCartList])
    
    // console.log("cartList from get cart: ", cartList);
    // console.log("userId from get cart: ", userId);
    
    return (
        <div className="cart-main" style={{ color: "whitesmoke" }}>
            {/* {console.log("Cart list from cart.component: ", cartList)} */}
            <h1 className="cart-title">Shopping Cart</h1>
            <div className="cart-contents">
                <CartItem user={props.cartList}/>
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </div>
        </div>
    )
}