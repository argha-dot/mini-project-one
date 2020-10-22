import React, { useEffect, useState } from "react";
import "./category.component.css";
import ItemCategory from "./item.category.component"
import axios from "axios";
import { Dropdown, DropdownButton } from "react-bootstrap";



const key = {
    "games": "Vintage Gaming",
    "monitor": "Monitors",
    "motherboard": "Motherboard",
    "cpu": "CPU",
    "psu": "Power Unit and Cooling",
    "ram": "Memory",
    "peri": "Peripherals",
    "graphics": "Graphics Card",
    "cabinets": "Cabinets",
    "storage": "Storage"
}

export default function Category(props) {
    var categoryId = props.match ? props.match.params.catId : '';
    const user = props.location.state? props.location.state.user : '';
    const [productList, setProductList] = useState([{
        "pictures": [
            "https://illlustrations.co/static/cb0069bee07d4675ef939a4c61774cac/116-gameboy.png"
        ],
        "category": "",
        "_id": "",
        "name": "",
        "description": "",
        "price": "",
    }]);

    const fetchData = () => {
        axios.get(`/api/products/`)
            .then((response) => {
                console.log(`reponse from category: ${response}`)
                setProductList(response.data.products)
            })
            .catch(err => console.log(`${err} from catergory.component frontend`))
    }

    useEffect(() => {
        fetchData();
    }, [])



    return(
        <div className = "category-main" >
            {/* {console.log(productList)} */}
            <div className="cat-topbar">
                <h3 className="cat-title">{key[categoryId]}</h3>
                <DropdownButton size="sm" id="dropdown-basic-button" title="Filter" style={{ marginRight: "6rem" }}>
                    <Dropdown.Item 
                        as="button" 
                        onClick={() => {setProductList(productList.sort((a, b) => {
                            console.log(productList)
                            return Number(a.price.replace(/\D/g, '')) - Number(b.price.replace(/\D/g, ''))
                        }))}}>
                        Sort by Price
                    </Dropdown.Item>
                    <Dropdown.Item as="button" >Another action</Dropdown.Item>
                    <Dropdown.Item as="button" >Something else</Dropdown.Item>
                </DropdownButton>
            </div>
            <br />
            <div className="cat-contents">
                {
                    productList.map((index) => (
                        index.category === key[categoryId] ? <ItemCategory data={index} user={user} key={index._id}/>:null
                    ))
                }
            </div>
        </div>
    )
}