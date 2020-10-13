import React, { useState } from "react";
import "./profile.component.css";

import Navigation from "./navi.profile.compnent"
import Overview from "./over.profile.component"
import Address from "./add.profile.component"

export default function Profile() {

    const [current, setCurrent] = useState("over");
    const tabs = [
        {
            name: "over",
            label: "Account Overview",
            content: (<Overview />)
        },
        {
            name: "address",
            label: "Addresses",
            content: (<Address />)
        },
        {
            name: "orders",
            label: "Your Orders",
            content: (<Navigation />)
        },
        {
            name: "wish",
            label: "Your Wishlist",
            content: (<Navigation />)
        }
    ]

    return(
        <div className="profile-main">
            
            <div className="profile-navigation">
                <img 
                    className="profile-img" 
                    src="https://www.w3schools.com/howto/img_avatar.png" 
                    alt="profile pic" 
                    style={{"width": "150px"}} />
                {
                    tabs.map((tab, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(tab.name)}
                            className={`profile-nav-button ${(tab.name === current) ? "profile-tab-active": ""}`}>
                              {tab.label}
                        </button>
                    ))
                }
            </div>

            {
                tabs.map((tab, i) => {
                    if (tab.name === current) {
                        return <div className="content-main" key={i}>{tab.content}</div>;
                    } else {
                        return null;
                    }
                })
            }
        </div>
    )
}
