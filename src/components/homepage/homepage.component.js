import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import { Link } from "react-router-dom"
import axios from "axios"

import "./homepage.component.css";

const category = [["Motherboard", "https://images.unsplash.com/photo-1510746001195-0db09655b6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80", "motherboard"],
                ["Memory", "https://images.unsplash.com/photo-1562976540-1502c2145186?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1778&q=80", "ram"],
                ["CPU", "https://images.unsplash.com/photo-1555617778-02518510b9fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", "cpu"],
                ["Storage", "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80", "storage"],
                ["Cabinets", "https://images.unsplash.com/photo-1592664474496-8f2c35acd655?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", "cabinets"],
                ["Peripherals", "https://images.unsplash.com/photo-1595074475126-11362260b8aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80", "peri"],
                ["Graphics Card", "https://images.unsplash.com/photo-1591489378430-ef2f4c626b35?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80", "graphics"],
                ["Power Units/Cooling", "https://images.unsplash.com/photo-1562976540-1502c2145186?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1778&q=80", "psu"],
                ["Monitors", "https://images.unsplash.com/photo-1547658718-1cdaa0852790?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80", "monitor"],
                ["For Gamers", "https://images.unsplash.com/photo-1599005280793-04627b9bd10a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80", "games"]
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

export default function Homepage(props) {

  const user = props.user; 
  // console.log("usr Id from Home  Page:", user); 

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
        // console.log(`reponse from homepage: ${response}`)
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
      {/* {console.log(productList)} */}
      <Carousel className="home-carousel">
        {
          productList.map((item) => (
            <Carousel.Item key={item._id}>
            <Link to={{
                pathname: `/product/${item._id}`,
                state: {
                  user: user
                }
              }}
              style={{ display: "flex", gap: "160px" }}
              >
                <img
                  className="home-carousel-img"
                  src={item.pictures[0]}
                  alt={`${item.name}`}
                  style={{  height: "15rem", 
                            width: "auto", 
                            borderRadius: "10px", 
                            marginTop: "40px", 
                            marginLeft: "150px", 
                            maxWidth: "30rem", 
                            border: "5px solid rgb(3, 85, 81)" }}/>
                <div className="home-carousel-des"
                  style={{  color: "wheat", 
                            display: "flex", 
                            flexDirection: "column", 
                            marginTop: "48px" }}>
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
            <Link to={{
              pathname: `/category/${item[2]}`,
              state: {
                user: user
              }
            }} 
              className="homepage-photo-card"
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
