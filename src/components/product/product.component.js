import React, { Component } from "react";
import { Carousel, Form, ButtonGroup, Button } from "react-bootstrap";
import "./product.component.css"
import "./input.css"


export default class Product extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            "inputValue": 1,
            "id": "",
            "category": "",
            "productName": "",
            "description": "",
            "price": "",
            "imgLinks": []
        }
    }

    componentDidMount() {
        this.setState({
            "id": "mac",
            "category": "Laptos",
            "productName": "MacBook Pro",
            "description": "MacBook Pro elevates the notebook to a whole new level of performance and portability. Wherever your ideas take you, you’ll get there faster than ever with high‑performance processors and memory, advanced graphics, blazing‑fast storage and more — all in a compact 1.4-kilogram package.",
            "price": "₹200000",
            "imgLinks": ["https://illlustrations.co/static/51910853e26bd8a9c89c36d25498c2c6/118-macbook.svg", "https://illlustrations.co/static/7fdea21037f680a946e430532feed521/112-installing.svg"]
        })
    }

    increment = () => {
        var max = document.getElementsByClassName("input-number")[0].getAttribute("max");
        this.setState({"inputValue": (this.state.inputValue >= max) ? this.state.inputValue : this.state.inputValue+1});
        console.log(max);
    }

    decrement = () => {
        var max = document.getElementsByClassName("input-number")[0].getAttribute("min");
        this.setState({ "inputValue": (this.state.inputValue <= max) ? this.state.inputValue : this.state.inputValue - 1 });
        console.log(this.inputValue);
    }

    render() {

        var add = {
            borderRadius: "0px", 
            backgroundColor: "whitesmoke",
            border: "none"
        }

        var buy = {
            borderRadius: "0px",
            backgroundColor: "darkgray",
            border: "none"
        }

        return(
            <div className="product-main">
                <Carousel>{
                    this.state.imgLinks.map(function(link) {
                        return <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={link}
                                alt="First slide" />
                        </Carousel.Item>
                    })   
                }
                </Carousel>
                
                <div className="product-description">
                    <div className="product-category">{this.state.category}</div>
                    <div className="product-name">{this.state.productName}</div>
                    <div className="product-text">
                        <p> {this.state.description} </p>
                    </div>
                    <div className="order-info">
                        <div className="product-price"> {this.state.price} </div>
                        <Form className="product-form">
                            <span 
                                className="input-number-decrement" 
                                onClick={this.decrement}
                            >–</span>
                            <input
                                className="input-number"
                                type="text"
                                placeholder={this.state.inputValue}
                                min="1"
                                max="10"
                            ></input>
                            <span 
                                className="input-number-increment"
                                onClick={this.increment}
                            >+</span>
                        </Form>
                        <div className="shop-btn">
                            <ButtonGroup className="add-buy">
                                <Button style={add}>
                                    <a className="add-link"
                                        style={{ textDecoration: "none" }}
                                        href="https://www.youtube.com/">
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
}