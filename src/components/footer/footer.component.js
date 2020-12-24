import React, { Component } from "react";
import "./footer.component.css"
// import { Link } from "react-router-dom"

export default class Footer extends Component 
{
    render (){

        return (
            <div className="footer">
                <div className="usefulVarName"><a style={{ color: "white" }} target="_blanck" href="https://blacklivesmatter.com/">About Us </a></div>
                <div className="usefulVarName"><a style={{ color: "white" }} target="_blanck" href="https://github.com/aarav22/E-Travel-Website-Mini-Project-2">Connect with Us </a></div> 
                <div className="usefulVarName"><a style={{ color: "white" }} target="_blanck" href="https://blacklivesmatter.com/">Support </a></div> 
            </div>
        )
    }

}