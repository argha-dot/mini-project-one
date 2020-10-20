import React, { useEffect, useState } from "react";
import Axios from "axios";
import CartItem from "./item.cart.component";

import "./cart.component.css";


export default function Cart(props) {

    const [cartList, setCartList] = useState('')


    useEffect(() => {
        Axios.get(`/api/see_cart/${props.userId}`)
            .then(response => {
                setCartList(response.data.product)
            }).catch(err => console.log(err))

    }, [cartList])

    return (
        <div className="cart-main" style={{ color: "whitesmoke" }}>
            <h1 className="cart-title">Shopping Cart</h1>
            <div className="cart-contents">
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </div>
        </div>
    )
}