import React from "react";
import { Link } from "react-router-dom";


export default function CartSide(props) {
    return(
        <div className="cart-side-main"
            style={{ backgroundColor: "#073638"}}
        >
            <Link to={{
                pathname: `/buy`,
                state: { user: props.user }}}
                className="buy-button">
                Checkout
            </Link>
            {props.total}
        </div>
    )
}