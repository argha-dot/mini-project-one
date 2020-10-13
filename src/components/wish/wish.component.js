import React from "react";
import WishItem from "./item/item.wish.component"
import "./wish.component.css";

export default function Wish() {
    return (
        <div className="wish-main">
            <h3 className="wish-title">Your Wishlist</h3>
            <WishItem />
            <WishItem />
            <WishItem />
        </div>
    )
}

