import React, {useEffect, useState } from "react";
import WishItem from "./item/item.wish.component"
import "./wish.component.css";

import WishC from "../crud_wishlist";

export default function Wish(props) {
    const [wishList, setWishList] = useState(null);
    const [userId, setUserId] = useState(props.user ? props.user._id : "")

    
    useEffect(() => {
        setUserId(props.user ? props.user._id : "")
        setWishList(WishC('GET_WISHLIST_INFO', userId, ""))
    }, [userId, wishList])

    console.log("wishList from get wish: ", wishList);
    console.log("userId from get wish: ", userId);

    return (
        <div className="wish-main">
            <h3 className="wish-title">Your Wishlist</h3>
            <WishItem />
            <WishItem />
            <WishItem />
        </div>
    )
}

