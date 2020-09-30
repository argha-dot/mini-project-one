import React, { Component } from 'react';
import "./dashboard.component.css"
import Carousel from 'react-bootstrap/Carousel'

export default class Dashboard extends Component {

    render() {
        return (
            <div className="dashboard-main" style={{ color: "whitesmoke" }}>
                Welcome "Name", what would you like to buy?
            </div>
        )
    }
}