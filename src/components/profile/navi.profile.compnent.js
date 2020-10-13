import React from "react";

export default function Navigation(props) {
    return(
        <nav className="profile-nav-main">
            <ul className="profile-nav-nav">
                <button className="profile-nav-button">Account Overview</button>
                <button className="profile-nav-button">Edit Profile</button>
                <button className="profile-nav-button">Addresses</button>
                <button className="profile-nav-button">Your Orders</button>
            </ul>
        </nav>
    )
}