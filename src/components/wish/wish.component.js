import React, {useEffect, useState } from "react";
import WishItem from "./item/item.wish.component"
import "./wish.component.css";
import Axios from "axios";

import WishC from "../crud_wishlist";

export default function Wish(props) {

    const [wishList, setWishList] = useState(null);
    const [userId, setUserId] = useState(props.user ? props.user._id : "")

    
    useEffect(() => {
        setUserId(props.user ? props.user._id : "");
        Axios({
            method: "GET",
            url: `http://localhost:5000/api/see_wishlist/${userId}`,
        })
        .then(response => {
            // console.log("Response from getWishlistInfo: ", response)
            setWishList(response.data.wishlist);
        })
        .catch(err => console.log("getWishlistInfo from front-end Error: ", err));
    }, [wishList])

    // console.log("wishList from get wish: ", wishList);
    // console.log("userId from get wish: ", userId);

    return (
        <div className="wish-main">
            <h3 className="wish-title">Your Wishlist</h3>
            <br />
            <div className="wish-contents">
                {
                    wishList && wishList.map((item) => {
                        return (
                            <WishItem userId={userId} wishDetails={item} key={item.id} />
                        )
                    })
                }
            </div>
        </div>
    )
}

