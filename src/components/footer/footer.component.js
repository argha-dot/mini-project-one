import React, { Component } from "react";
import "./footer.component.css"
import { Link } from "react-router-dom"

export default class Footer extends Component 
{
    render (){

        return (
            <div className="footer">
                <Link to="/about.us" className="usefulVarName">Know More About Us</Link>
                <div className="usefulVarName"><a style={{ color: "white" }} target="_blanck" href="https://github.com/argha-dot/mini-project-one">Connect with Us </a></div> 
            </div>
        )
    }

}