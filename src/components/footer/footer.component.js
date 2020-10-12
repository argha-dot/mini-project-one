import React, { Component } from "react";
import "./footer.component.css"



export default class Footer extends Component 
{
    render (){

        return (
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div >
                            <h6>About Us</h6>
                        </div>
                        <div >
                            <h6>Connect with Us</h6>
                        </div>
                        <div >
                            <h6>Support Us</h6>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}