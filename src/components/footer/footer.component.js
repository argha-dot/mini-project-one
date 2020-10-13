import React, { Component } from "react";
import "./footer.component.css"



export default class Footer extends Component 
{
    render (){

        return (
            <div className="footer">
                <div className="usefulVarName">About Us</div>
                <div className="usefulVarName">Connect with Us</div>
                <div className="usefulVarName">Support Us</div>
            </div>
        )
    }

}