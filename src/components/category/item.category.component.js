import React from "react";
import { Link } from "react-router-dom";

const data = [
    {
        "id": "gameboy",
        "category": "Vintage Gaming",
        "productName": "Gameboy",
        "description": "Nintendo’s GameBoy made its Japanese debut on April 21, 1989. With a murky screen and chunky physical design, Game Boy wasn’t the most impressive of game systems — but what it lacked in power, it made up for in affordability ... and, over time, an incredible library. Ask any Game Boy owner for a list of their favorite games and you’ll get a huge variety of answers thanks to the fact that the system saw north of 1000 games over its lifetime, many of which were good and some of which were truly great and Pokemon is love.",
        "price": "₹2000",
        "imgLinks": ["https://illlustrations.co/static/cb0069bee07d4675ef939a4c61774cac/116-gameboy.png", "https://64.media.tumblr.com/e5f1772c9315615fd54d0727f762c3d5/tumblr_o3paohrAl31v8mn5wo1_1280.jpg"]
    },
    {
        "pictures": [
            "https://illlustrations.co/static/cb0069bee07d4675ef939a4c61774cac/116-gameboy.png",
            "https://64.media.tumblr.com/e5f1772c9315615fd54d0727f762c3d5/tumblr_o3paohrAl31v8mn5wo1_1280.jpg"
        ],
        "category": "Vintage Gaming",
        "_id": "5f8226bd85da3239dc1f5c25",
        "name": "Gameboy",
        "description": "Nintendo’s GameBoy made its Japanese debut on April 21, 1989. With a murky screen and chunky physical design, Game Boy wasn’t the most impressive of game systems — but what it lacked in power, it made up for in affordability ... and, over time, an incredible library. Ask any Game Boy owner for a list of their favorite games and you’ll get a huge variety of answers thanks to the fact that the system saw north of 1000 games over its lifetime, many of which were good and some of which were truly great and Pokemon is love.",
        "price": "₹2000",
    }
]

export default function ItemCategory(props) {

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