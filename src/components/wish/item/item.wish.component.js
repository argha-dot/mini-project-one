import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import WishC from "../../crud_wishlist";
import CartC from "../../crud_cart";

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


export default function WishItem(props) {

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        Axios.get(`/api/products/${props.wishDetails ? props.wishDetails.id : null}`)
            .then(response => {
                setProductList(response.data.product)
            }).catch(err => console.log(err))

    }, [])

    const _deleteFromWish = () => {
        WishC("DELETE_FROM_WISHLIST", props.userId, props.wishDetails.id);
        console.log("deleted succefully");
    };

    const _moveToCart = () => {
        WishC("DELETE_FROM_WISHLIST", props.userId, props.wishDetails.id);
        CartC("ADD_TO_CART", props.userId, props.wishDetails.id);
    }

    return(
        <div className="wish-item">
            <Link to={"/product/" + productList.id}
                className="wish-item-link"
                style={{ color: "#ffffff" }}>
                {productList.name}
            </Link>
            <div className="wish-item-img">
                <img src={productList ? (productList.pictures ? productList.pictures[0]:"https://www.amplifiedtelephones.co.uk/user/products/large/image-unavailable-amplified-telephones.jpg"):data.gameboy.imgLinks[0]}
                    alt="Something"
                    width="160px" />
            </div>
            <div className="wish-item-buttons">
                <button 
                    className="wish-item-del"
                    onClick={_deleteFromWish}
                >Delete</button>
                <button 
                    className="wish-item-wish"
                    onClick={_moveToCart}
                >Move To Cart</button>
            </div>
            <h3 className="wish-item-price">
                {"Price: " + productList.price}
            </h3>
        </div>
    )
}