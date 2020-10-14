import React, { useEffect, useState } from "react";
import Axios from 'axios'
import { Carousel, Form, ButtonGroup, Button } from "react-bootstrap";
import {addToCart} from '../crud_cart'; 
// import { addToCart } from '../../redux/reducer';
// import { useDispatch } from 'react-redux';
import "./product.component.css"
import "./input.css"

function ProductPage(props) {
    // const dispatch = useDispatch();
    const productId = props.match? props.match.params.productId: '';
    var userId = props.user? props.user._id : '';
    // var user = props.user? props.user : '';

    console.log("Product Id from product page: ", productId)
    console.log("usr Id from Product Page:", userId); 
    // console.log("Product ID: ", productId); 
    const [Product, setProduct] = useState('')
    const [qty, setIncrement] = useState(1)
    // const [userId, setUserId] = useState('')

    // props.user? setUserId(props.user._id) : setUserId('');
    


    useEffect(() => {
        // console.log("Query: ", `/api/products/${productId}`)
        Axios.get(`/api/products/${productId}`)
            .then(response => {
                setProduct(response.data.product)
            }).catch(err => console.log(err))

    }, [Product])

    function _addToCart() {
        addToCart(productId, userId);
        // const request = Axios({
        //     method: "POST",
        //     url: `http://localhost:5000/api/cart?productId=${productId}`,
        //     data: {_id: userId}
        // })
        // .then(response => console.log("Response from add to cart: ", response))
        // .catch(err => console.log("Add to Cart Error: ", err));
    }

    var buy = {
        borderRadius: "0px",
        backgroundColor: "darkgray",
        border: "none"
    }

    return (
        <div className="product-main">
            <Carousel>{
                Product.pictures && Product.pictures.map(function (link) {
                    return <Carousel.Item key={link.toString()}>
                        <img
                            className="d-block w-100"
                            src={link}
                            alt="First slide" />
                    </Carousel.Item>
                })
            }
            </Carousel>

            <div className="product-description">
                <div className="product-category">{Product.category}</div>
                <div className="product-name">{Product.name}</div>

                <div className="product-text">
                    <p> {Product.description} </p>
                </div>

                <div className="order-info">
                    <div className="product-price"> {Product.price} </div>

                    <Form className="product-form">
                        <span
                            className="input-number-decrement"
                            onClick={() => setIncrement(qty > 0 ? qty - 1 : 0)}
                        >–</span>
                        <input
                            className="input-number"
                            type="text"
                            placeholder={qty}
                            min="1"
                            max="10"
                            readOnly="readOnly"
                        ></input>
                        <span
                            className="input-number-increment"
                            onClick={() => setIncrement(qty < 10 ? qty + 1 : qty)}
                        >+</span>
                    </Form>

                    <div className="shop-btn">
                        <ButtonGroup className="add-buy">
                            <Button>
                                <a className="add-link"
                                    style={{ textDecoration: "none" }}
                                    onClick={_addToCart}>
                                    Add To Cart
                                    </a>
                            </Button>

                            <Button variant="dark" style={buy}>
                                <a className="buy-link"
                                    style={{ textDecoration: "none" }}
                                    href="https://itch.io/">
                                    Buy Now
                                    </a>
                            </Button>
                        </ButtonGroup>

                        <button className="add-wishlist">
                            <i className="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const data =
{
    "gameboy": {
        "id": "gameboy",
        "category": "Vintage Gaming",
        "productName": "Gameboy",
        "description": "Nintendo’s GameBoy made its Japanese debut on April 21, 1989. With a murky screen and chunky physical design, Game Boy wasn’t the most impressive of game systems — but what it lacked in power, it made up for in affordability ... and, over time, an incredible library. Ask any Game Boy owner for a list of their favorite games and you’ll get a huge variety of answers thanks to the fact that the system saw north of 1000 games over its lifetime, many of which were good and some of which were truly great and Pokemon is love.",
        "price": "₹2000",
        "imgLinks": ["https://illlustrations.co/static/cb0069bee07d4675ef939a4c61774cac/116-gameboy.png", "https://64.media.tumblr.com/e5f1772c9315615fd54d0727f762c3d5/tumblr_o3paohrAl31v8mn5wo1_1280.jpg"]
    },
    "mac": {
        "id": "mac",
        "category": "Laptos",
        "productName": "MacBook Pro",
        "description": "MacBook Pro elevates the notebook to a whole new level of performance and portability. Wherever your ideas take you, you’ll get there faster than ever with high‑performance processors and memory, advanced graphics, blazing‑fast storage and more — all in a compact 1.4-kilogram package.",
        "price": "₹200000",
        "imgLinks": ["https://illlustrations.co/static/c1d4e46b9c47b80037efe76e41c57128/111-coding.svg", "https://illlustrations.co/static/51910853e26bd8a9c89c36d25498c2c6/118-macbook.svg", "https://illlustrations.co/static/7fdea21037f680a946e430532feed521/112-installing.svg"]
    },
    "nintendo64": {
        "id": "nintendo64",
        "category": "Vintage Gaming",
        "productName": "Nintendo 64",
        "description": "The Nintendo 64 was one of the first gaming consoles to have four controller ports.The most graphically demanding Nintendo 64 games that arrived on larger 32 or 64 MB cartridges are the most advanced and detailed of the 32-bit/64-bit generation. In order to maximize use of the Nintendo 64 hardware developers had to create their own custom microcode. Nintendo 64 games running on custom microcode benefited from much higher polygon counts in tandem with more advanced lighting, animation, physics and AI routines than its 32-bit competition. ",
        "price": "₹7000",
        "imgLinks": ["https://core-electronics.com.au/media/catalog/product/8/b/8bitdo-n64-primo.jpg"]
    }
}

export default ProductPage;
