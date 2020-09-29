import React, { Component } from "react";
import { Carousel, Form, ButtonGroup, Button } from "react-bootstrap";
import "./product.component.css"
import "./input.css"

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
    }
}

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
                {console.log(this.props.match.params.id)}
                <Carousel>{
                    this.state.imgLinks.map(function(link) {
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
                                readOnly="readOnly"
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

    componentDidMount() {
        this.setState({
            "id": data[this.props.match.params.id].id,
            "category": data[this.props.match.params.id].category,
            "productName": data[this.props.match.params.id].productName,
            "description": data[this.props.match.params.id].description,
            "price": data[this.props.match.params.id].price,
            "imgLinks": data[this.props.match.params.id].imgLinks
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.setState({
                "id": data[this.props.match.params.id].id,
                "category": data[this.props.match.params.id].category,
                "productName": data[this.props.match.params.id].productName,
                "description": data[this.props.match.params.id].description,
                "imgLinks": data[this.props.match.params.id].imgLinks,
                "price": data[this.props.match.params.id].price
            })
        }
    }
}