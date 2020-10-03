import React, { Component } from "react";
import "./category.component.css";
// import Product from "../product/product.component"
// import Link from "react-router-dom";

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
    "nintendo64": {
        "id": "nintendo64",
        "category": "Vintage Gaming",
        "productName": "Nintendo 64",
        "description": "The Nintendo 64 was one of the first gaming consoles to have four controller ports.The most graphically demanding Nintendo 64 games that arrived on larger 32 or 64 MB cartridges are the most advanced and detailed of the 32-bit/64-bit generation. In order to maximize use of the Nintendo 64 hardware developers had to create their own custom microcode. Nintendo 64 games running on custom microcode benefited from much higher polygon counts in tandem with more advanced lighting, animation, physics and AI routines than its 32-bit competition. ",
        "price": "₹7000",
        "imgLinks": ["https://lh3.googleusercontent.com/6I2HLiHlVejuvF93SOLnkb9QJ7KovxqcH98w-xfyaDq1_3b3-5LoOG3G90fIBeEOR6DpsAiix15BWe6SCXpRgzty8hvIBu549obE_w=s2048", "https://illlustrations.co/static/51910853e26bd8a9c89c36d25498c2c6/118-macbook.svg", "https://illlustrations.co/static/7fdea21037f680a946e430532feed521/112-installing.svg"]
    }
}

export default class Category extends Component {
    render() {
        return(
            <div className="category-main">
                <h3 className="cat-title">FOR GAMERS</h3>
                <div className="something"></div>
            </div>
        )
    }
}