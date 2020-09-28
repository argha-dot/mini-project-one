import React, { Component } from "react";
import { Carousel, Form } from "react-bootstrap";
import "./product.component.css"
import "./input.css"

export default class Product extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            "inputValue": 1,
        }
    }

    increment = () => {
        this.setState({"inputValue": this.inputValue++});
        console.log(this.inputValue);
    }
    
    render() {
        return(
            <div className="product-main">
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://illlustrations.co/static/cb0069bee07d4675ef939a4c61774cac/116-gameboy.png"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://64.media.tumblr.com/e5f1772c9315615fd54d0727f762c3d5/tumblr_o3paohrAl31v8mn5wo1_1280.jpg"
                            width="500px"
                            height="500px"
                            alt="First slide"
                        />
                    </Carousel.Item>
                </Carousel>
                
                <div className="product-description">
                    <div className="product-category">Vintage Gaming</div>
                    <div className="product-name">Gameboy</div>
                    <div className="product-text">
                        <p>
                            Nintendo’s Game Boy made its Japanese debut on April 21, 1989. With a murky screen and chunky physical design, Game Boy wasn’t the most impressive of game systems — but what it lacked in power, it made up for in affordability ... and, over time, an incredible library. Ask any Game Boy owner for a list of their favorite games and you’ll get a huge variety of answers thanks to the fact that the system saw north of 1000 games over its lifetime, many of which were good and some of which were truly great and Pokemon is love.
                        </p>
                    </div>
                    <div className="order-info">
                        <Form>
                            <span 
                                className="input-number-decrement" 
                            >–</span>
                            <input className="input-number" type="text" value={this.state.inputValue} min="0" max="10"></input>
                            <span 
                                className="input-number-increment"
                                onClick={this.increment}
                            >+</span>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}