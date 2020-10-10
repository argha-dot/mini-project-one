import React, { Component } from "react";
import "./footer.component.css"



export default class Footer extends Component 
{
    render (){

        return (
            <div>
                <footer>
                <div className="container">
                    <div className="row">
                    <div className="col-12 col-sm-4">
                        <h6>About Us</h6>
                    </div>

                    <div class="col-12 col-sm-4">
                        <h6>Connect with Us</h6>
        
                    </div>

                    <div class="col-12 col-sm-4">
                        <h6>Support Us</h6>
        
                    </div>
                    
                    </div>
                </div>
                </footer>
            </div>
        
        )
    }

}