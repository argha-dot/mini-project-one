import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'

import "./homepage.component.css";

const category=[["Motherboard", "https://images.unsplash.com/photo-1510746001195-0db09655b6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"],
                ["Memory", "https://illlustrations.co/static/5d79f1332ba62184353e36f18414d446/day43-ram.svg"],
                ["CPU", "https://images.unsplash.com/photo-1510746001195-0db09655b6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"],
                ["Storage", "https://illlustrations.co/static/c27ccee20e91c4ebc7234269ebe53498/day18-floppy.svg"],
                ["Cabinets", "https://illlustrations.co/static/40a0a907b32106ca33b171266df6b66b/day41-desktop.svg"],
                ["Peripherals", "https://illlustrations.co/static/9d3a8eb72777973c7712fa0bd8a87343/day70-designer-fav-tool-wacom.svg"],
                ["Graphics Card", "https://illlustrations.co/static/e196df89d9960fec2923f5452aa45796/day45-gpu-ati.svg"],
                ["Power Units/Cooling", "https://images.unsplash.com/photo-1562976540-1502c2145186?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1778&q=80"],
                ["Monitors", "https://illlustrations.co/static/400a443144902a220c67635c9e940fbd/day42-imac.svg"],
                ["For Gamers", "https://illlustrations.co/static/2bdf32f5efb298073fbe6e29689ac86a/day2-gaming-console.svg"]
              ]



export default class Homepage extends Component {
    render() {

        return (
          <div className="homepage-main" style={{ color: "whitesmoke" }}>
            <Carousel className="home-carousel">
              <Carousel.Item
              style={{ display: "flex"}}>
                <img
                  className="d-block home-carousel-img"
                  src={category[0][1]}
                  alt="First slide"
                  style={{ height: "15rem", width: "auto", borderRadius: "5%", marginTop: "40px", marginLeft: "150px"}}
                />
                {/* <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption> */}
              </Carousel.Item>
            </Carousel>
        
            <div className="homepage-grid-container">
              {category.map((item, key) => {
                  return(
                    <div className="homepage-photo-card" 
                    key={key}
                    style={{ backgroundImage: `url(${item[1]})` }}>
                      {item[0]}
                    </div>
                  )
              })} 
            </div>
          </div>
        )
    }
}
