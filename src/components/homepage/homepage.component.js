import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import { Link } from "react-router-dom"
import axios from "axios"

import "./homepage.component.css";

const category = [["Motherboard", "https://images.unsplash.com/photo-1510746001195-0db09655b6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80", "motherboard"],
                ["Memory", "https://illlustrations.co/static/5d79f1332ba62184353e36f18414d446/day43-ram.svg", "ram"],
                ["CPU", "https://images.unsplash.com/photo-1510746001195-0db09655b6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80", "cpu"],
                ["Storage", "https://illlustrations.co/static/c27ccee20e91c4ebc7234269ebe53498/day18-floppy.svg", "storage"],
                ["Cabinets", "https://illlustrations.co/static/40a0a907b32106ca33b171266df6b66b/day41-desktop.svg", "cabinets"],
                ["Peripherals", "https://illlustrations.co/static/9d3a8eb72777973c7712fa0bd8a87343/day70-designer-fav-tool-wacom.svg", "peri"],
                ["Graphics Card", "https://illlustrations.co/static/e196df89d9960fec2923f5452aa45796/day45-gpu-ati.svg", "graphics"],
                ["Power Units/Cooling", "https://images.unsplash.com/photo-1562976540-1502c2145186?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1778&q=80", "psu"],
                ["Monitors", "https://illlustrations.co/static/400a443144902a220c67635c9e940fbd/day42-imac.svg", "monitor"],
                ["For Gamers", "https://illlustrations.co/static/2bdf32f5efb298073fbe6e29689ac86a/day2-gaming-console.svg", "games"]
              ]

const chooseRandom = (arr, num = 1) => {
  const res = [];
  for (let i = 0; i < num;) {
    const random = Math.floor(Math.random() * arr.length);
    if (res.indexOf(arr[random]) !== -1) {
      continue;
    };
    res.push(arr[random]);
    i++;
  };
  return res;
};

export default function Homepage() {

  const [productList, setProductList] = useState([{
    "pictures": [
      "https://illlustrations.co/static/cb0069bee07d4675ef939a4c61774cac/116-gameboy.png"
    ],
    "category": "Vintage Gaming",
    "_id": "5f8226bd85da3239dc1f5c25",
    "name": "Gameboy",
    "description": "",
    "price": "₹2000",
  }]);

  const fetchData = () => {
    axios.get(`/api/products/`)
      .then((response) => {
        console.log(`reponse from homepage: ${response}`)
        setProductList(chooseRandom(response.data.products, 4))
      })
      .catch(err => console.log(`${err} from catergory.component frontend`))
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 100);
  }, [])

  return (
    <div className="homepage-main" style={{ color: "whitesmoke" }}>
      {console.log(productList)}
      <Carousel className="home-carousel">
        {
          productList.map((item) => (
            <Carousel.Item key={item._id}>
              <Link to={`/product/${item._id}`} style={{ display: "flex", gap: "160px" }}>
                <img
                  className="home-carousel-img"
                  src={item.pictures[0]}
                  alt={`picture of ${item.name}`}
                  style={{ height: "15rem", width: "auto", borderRadius: "10px", marginTop: "40px", marginLeft: "150px", maxWidth: "30rem" }}
                />
                <div className="home-carousel-des"
                style={{ color: "wheat", display: "flex", flexDirection: "column", marginTop: "48px" }}>
                  <h6 className="home-car-cat">{item.category}</h6>
                  <h3 className="home-car-title"
                  style={{ wordWrap: "break-word", width: "30rem" }}>
                    {item.name}
                    </h3>
                  <p className="home-car-para">
                    {item.price}
                    </p>
                </div>
              </Link>
            </Carousel.Item>
          ))
        }
      </Carousel>

      <div className="homepage-grid-container">
        {category.map((item, key) => {
          return (
            <Link to={`/category/${item[2]}`} className="homepage-photo-card"
              key={key}
              style={{ backgroundImage: `url(${item[1]})`, color: "white" }}>
              {item[0]}
            </Link>
          )
        })}
      </div>
    </div>

  )
}
