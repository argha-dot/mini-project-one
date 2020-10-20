import React, { Component } from "react";
import "./footer.component.css"



export default class Footer extends Component 
{
    render (){

        return (
            <div className="footer">
                <div className="usefulVarName">About Us</div>
                <div className="usefulVarName"><a href="https://github.com/argha-dot/mini-project-one">Connect with Us </a></div> 
                <div className="usefulVarName">Support Us</div>
            </div>
        )
    }

}