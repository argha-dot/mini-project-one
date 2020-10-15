import React from "react";
import { Link } from "react-router-dom";

export default function ItemCategory(props) {

    console.log(props.data);

    return(
        <div className = "cat-item" >
            <Link to={`/product/${props.data._id}`}
            className="cat-item-title cat-title"
            style={{ "color": "#6b6b6b" }}>
                {props.data.name}
            </Link>
            <div className="cat-img">
                <img src={props.data.pictures[0]} width={"250px"}
                    alt="Something"/>
            </div>
            
            <div className="cat-description">
                {props.data.description}
            </div>
            <div className="btns">
                <span className="cat-item-price">{props.data.price}</span>
                <button className="add-to">
                    <a className="add-link"
                        style={{ textDecoration: "none" }}
                        href="https://www.youtube.com/">
                    Add To Cart
                    </a>
                </button>
                <button className="add-wishlist">
                    <i className="fas fa-heart"></i>
                </button>
            </div>
        </div>
    )
}