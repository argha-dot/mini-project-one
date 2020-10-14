import React, { useEffect, useState } from "react";
import "./category.component.css";
import { Link } from "react-router-dom";
import ItemCategory from "./item.category.component"
import axios from "axios";

const data = [
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

export default function Category() {
    const [productList, setProductList] = useState([{
        "pictures": [
            "https://illlustrations.co/static/cb0069bee07d4675ef939a4c61774cac/116-gameboy.png",
            "https://64.media.tumblr.com/e5f1772c9315615fd54d0727f762c3d5/tumblr_o3paohrAl31v8mn5wo1_1280.jpg"
        ],
        "category": "",
        "_id": "",
        "name": "",
        "description": "",
        "price": "",
    }]);

    const fetchData = () => {
        axios.get(`api/products/`)
            .then((response) => {
                // const setItem = 
                setProductList(response.data.products)
            })
            .catch(err => console.log(`${err} from catergory.component frontend`))
    }

    useEffect(() => {
        setTimeout(() => {
            fetchData();
        }, 1000);
    }, [])

    return(
        <div className = "category-main" >
            {console.log(productList)}
            <h3 className="cat-title">FOR GAMERS</h3>
            <br />
            <div className="cat-contents">
                {
                    productList.map((index) => (
                        index.category==="Vintage Gaming"?<ItemCategory data={index} />:null
                    ))
                }
            </div>
        </div>
    )
}