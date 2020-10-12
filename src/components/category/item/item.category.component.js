import React, { Component } from "react";
import "../category.component.css";
import { Link } from "react-router-dom";

export default class ItemCategory extends Component {
    

    render() {
        return(
            <div className="cat-item">
                <Link to={`/product/${data.gameboy.id}`} 
                className="cat-item-title cat-title"
                style={{ "color": "#6b6b6b" }}>
                    {data.gameboy.productName}
                </Link>
                <div className="cat-img">
                    <img src={data.gameboy.imgLinks[0]} width={"250px"}
                         alt="Something"/>
                </div>
                
                <div className="cat-description">
                    {data.gameboy.description}
                </div>
                <div className="btns">
                    <span className="cat-item-price">{data.gameboy.price}</span>
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
}