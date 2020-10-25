import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import "./buy.component.css"

function AddressBook() {
    return (
        <div className="address">
            <div className="select-address">
                <h4>Select an Address</h4>
            </div>

            <br />

            <div className="another-address">
                <h4>Deliver to Another Address</h4>
                <Form>
                    <Form.Group>
                        <Form.Label>Flat, House no., Building, Company, Apartment</Form.Label>
                        <Form.Control placeholder="D-3 Some Appartment" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Landmark</Form.Label>
                        <Form.Control placeholder="Near AIIMS Flyover, Behind somewhere" />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Sector, Village</Form.Label>
                            <Form.Control placeholder="E.g, Vastrapur" />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Pin Code</Form.Label>
                            <Form.Control placeholder="6 digits [0-9] PIN Code" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>City</Form.Label>
                            <Form.Control placeholder="E.g, Ahmedabad" />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>State</Form.Label>
                            <Form.Control placeholder="E.g, Gujrat" />
                        </Form.Group>
                    </Form.Row>
                </Form>
            </div>
        </div>
    )
}

function DeliveryOptions() {
    return (
        <div>
            <h4>Payment/Delivery</h4>
            <br />
            <div>
                <div className="payment">
                    <h5>Choose your Payment Method</h5>
                    <input type="radio" id="card" name="pay" value="card" />
                    <label for="card">Credit Card / Debit Card</label><br />
                    <input type="radio" id="bank" name="pay" value="bank" />
                    <label for="bank">Internet Banking</label><br />
                    <input type="radio" id="cash" name="pay" value="cash" />
                    <label for="cash">Cash on Dewlivery</label>
                </div>
                <br />
                <div className="arrival">
                    <h5>Choose A delivery speed</h5>
                    <input type="radio" id="" name="delivery" value="" />
                    <label for="">Sometime after 23rd Century</label><br />
                    <input type="radio" id="" name="delivery" value="" />
                    <label for="">Decembruary 1, 2018</label><br />
                    <input type="radio" id="" name="delivery" value="" />
                    <label for="">Use a Random number generator</label><br />

                </div>
            </div>
        </div>
    )
}

function PlaceOrder() {
    return(
        <div>
            <h4>Place Your Order</h4>
            <div>
                 
            </div>
        </div>
    )
}

export default function Buy(props){

    const [curretnTab, setTab] = useState((props.tab) ? props.tab : "confirm");
    const tabs = [
        {
            name: "address",
            label: "Select Address",
            content: (<AddressBook />)
        },
        {
            name: "delivery",
            label: "Delivery Option",
            content: (<DeliveryOptions />)
        },
        {
            name: "confirm", 
            label: "Place Your Order", 
            content: (<PlaceOrder />)
        }
    ]

    return (
        <div className="buy-container">
            {console.log("From buy page: ", props.location ? props.location.state.user : null)}
            <h2 className="buy-title">CHECKOUT</h2>
            <div className="buy-nav">
                {
                    tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setTab(tab.name)}
                            className={`buy-nav-btns ${(tab.name === curretnTab) ? "buy-active-tab" : ""}`}
                        >{tab.label}
                        </button>
                    ))
                }
            </div>

            <br />

            {
                tabs.map((tab) => {
                    if (tab.name === curretnTab) {
                        return <div className="buy-content-main" key={tab.name}>{tab.content}</div>;
                    } else {
                        return null;
                    }
                })
            }

            <br />

            <div className="nav-buttoms">
                <button className="buy-nav-prev">
                    Previous
                </button>
                <button className="buy-nav-next">
                    Next
                </button>
            </div>

        </div>
    )
}