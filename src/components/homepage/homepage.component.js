import React, { Component } from 'react';
import "./homepage.component.css";
import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import "./base.css"
// import Grid from "./grid.html"
import one from "./1.jpg" 
import two from "./2.jpg" 
import three from "./3.jpeg"
import four from "./4.jpeg" 
import five from "./5.jpeg" 
import six from "./6.jpeg"  

const category=[["Motherboard", "https://images.unsplash.com/photo-1510746001195-0db09655b6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"],
                ["Memory", "https://images.unsplash.com/photo-1562976540-1502c2145186?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1778&q=80"],
                ["Motherboard", "https://images.unsplash.com/photo-1510746001195-0db09655b6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"],
                ["Memory", "https://images.unsplash.com/photo-1562976540-1502c2145186?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1778&q=80"],
                ["Motherboard", "https://images.unsplash.com/photo-1510746001195-0db09655b6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"],
                ["Memory", "https://images.unsplash.com/photo-1562976540-1502c2145186?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1778&q=80"],
                ["Motherboard", "https://images.unsplash.com/photo-1510746001195-0db09655b6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"],
                ["Memory", "https://images.unsplash.com/photo-1562976540-1502c2145186?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1778&q=80"],
                ["Motherboard", "https://images.unsplash.com/photo-1510746001195-0db09655b6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"],
                ["Memory", "https://images.unsplash.com/photo-1562976540-1502c2145186?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1778&q=80"]
              ]



export default class Homepage extends Component {
    render() {

        return (
            <div className="homepage-main" style={{ color: "whitesmoke" }}>

              
          <Carousel className="homepage-carousel">
                <Carousel.Item>
                  
                    <img src = {one}  
                    className="d-block w-100"/>

                  
                  <Carousel.Caption>
                    <h3>Lenovo IdeaCentre AIO 330 19.5-inch All-in-One Desktop </h3>
                    <p>₹ 25,000</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={one} 
                    alt="Second slide"
                  />

                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={one} 
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
          
              <div className="homepage-grid-container">
                {category.map((item, key) => {
                    return(
                      <div className="homepage-photo-grid" key = 
                      {key}>
                      <div
                          className="homepage-grid-card"
                        style={{ backgroundImage: `url("https://images.unsplash.com/photo-1510746001195-0db09655b6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80")` }}>
                      </div>
                      {item[0]}
                      
                  </div>
                    )
                })} 
            </div>
q
</div>
        )
    }
}
