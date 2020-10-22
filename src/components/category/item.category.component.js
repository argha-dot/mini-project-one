import React from "react";
import { Link } from "react-router-dom";

import CartC from '../crud_cart';
import WishlistC from '../crud_wishlist';


export default function ItemCategory(props) {

    console.log("From Item Category Page: ", props.user);
    const user = props.user;
    const userId = user ? props.user._id : null

    function _addToCart() {
        CartC("ADD_TO_CART", userId, props.data._id);
    }

    function _addToWishlist() {
        WishlistC("ADD_TO_WISHLIST", userId, props.data._id);
    }

    return(
        <div className="cat-item" >
            <Link to={{
                pathname: `/product/${props.data ? props.data._id : ''}`, 
                state: {
                    user:user
                }
            }}
            className="cat-item-title cat-title"
            style={{ "color": "#6b6b6b" }}>
                {props.data? props.data.name: ''}
            </Link>
            <div className="cat-img">
                <img src={props.data?props.data.pictures[0]:''} width={"250px"}
                    alt="Something"/>
            </div>
            
            <div className="cat-description">
                {props.data?props.data.description:''}
            </div>
            <div className="btns">
                <span className="cat-item-price">{props.data?props.data.price:''}</span>
                <button className="add-to"
                    onClick={_addToCart}>
                    Add To Cart
                </button>
                <button className="add-wishlist"
                    onClick={_addToWishlist}>
                    <i className="fas fa-heart"></i>
                </button>
            </div>
        </div>
    )
}