import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import CartC from "../crud_cart";
import WishC from "../crud_wishlist";

const data =
{
    "gameboy": {
        "id": "gameboy",
        "category": "Vintage Gaming",
        "productName": "Gameboy",
        "description": "Nintendo’s GameBoy made its Japanese debut on April 21, 1989. With a murky screen and chunky physical design, Game Boy wasn’t the most impressive of game systems — but what it lacked in power, it made up for in affordability ... and, over time, an incredible library. Ask any Game Boy owner for a list of their favorite games and you’ll get a huge variety of answers thanks to the fact that the system saw north of 1000 games over its lifetime, many of which were good and some of which were truly great and Pokemon is love.",
        "price": "₹2000",
        "imgLinks": ["https://illlustrations.co/static/cb0069bee07d4675ef939a4c61774cac/116-gameboy.png", "https://64.media.tumblr.com/e5f1772c9315615fd54d0727f762c3d5/tumblr_o3paohrAl31v8mn5wo1_1280.jpg"]
    }
}

export default function CartItem(props) {

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        Axios.get(`/api/products/${props.cartDetails ? props.cartDetails.id:null}`)
            .then(response => {
                setProductList(response.data.product)
            }).catch(err => console.log(err))

    }, [])

    const _deleteFromCart = () => {
        CartC("DELETE_FROM_CART", props.userId, props.cartDetails.id);
        console.log("deleted succefully");
    };

    const _moveToWishlist = () => {
        CartC("DELETE_FROM_CART", props.userId, props.cartDetails.id);
        WishC("ADD_TO_WISHLIST", props.userId, props.cartDetails.id); 
    }

    return (
        <div className="cart-item">
            {console.log(productList)}
            <Link to={"/product/" + productList.id}
                className="cart-item-link"
                style={ {color: "#6b6b6b"} }>
                {productList.name}
            </Link>
            <div className="cart-item-img">
                <img src={props.cartDetails ? productList.pictures:data.gameboy.imgLinks[0]} width={"250px"}
                    alt="Something"
                    width="160px"/>
            </div>
            <div className="cart-item-buttons">
                <button className="cart-item-qty">{props.cartDetails ? props.cartDetails.quantity : 1}</button>
                <button 
                    className="cart-item-del"
                    onClick={_deleteFromCart}>
                Delete</button>
                <button 
                    className="cart-item-wish"
                    onClick={_moveToWishlist}
                >Save To Wishlist</button>
            </div>
            <h3 className="cart-item-price">
                {"Price: " + productList.price}  
            </h3>
        </div>
    )
}