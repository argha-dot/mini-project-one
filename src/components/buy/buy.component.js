import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import "./buy.component.css"

var formStyle = { backgroundColor: "transparent",
                                    color: "rgba(255, 255, 255, 0.2)",
                                    border: "none",
                                    borderRadius: "0px",
                                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}

function AddressBook(props) {
    return (
        <div className="address">
            {console.log(props)}
            <div className="select-address">
                <h4>Select an Address</h4>
                <br />
                {
                    (props.user ? props.user.address:[]).map((addr) => (
                        <div>
                            <input type="radio" className="add-addr-input" id="addr.name" name="address" value="addr.name" />
                            <label for="addr.name">{addr.name}</label><br />
                        </div>
                    ))
                }
            </div>

            <br />

            <div className="another-address">
                <h4>Deliver to Another Address</h4>
                <br />
                <Form>
                    <Form.Group>
                        <Form.Label>Flat, House no., Building, Company, Apartment</Form.Label>
                        <Form.Control placeholder="E.g, D-3 Some Appartment" style={formStyle} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Landmark</Form.Label>
                        <Form.Control placeholder="E.g, Near AIIMS Flyover, Behind somewhere" style={formStyle} />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Sector, Village</Form.Label>
                            <Form.Control placeholder="E.g, Vastrapur" style={formStyle} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Pin Code</Form.Label>
                            <Form.Control placeholder="6 digits [0-9] PIN Code" style={formStyle} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>City</Form.Label>
                            <Form.Control placeholder="E.g, Ahmedabad" style={formStyle} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>State</Form.Label>
                            <Form.Control placeholder="E.g, Gujrat" style={formStyle} />
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
                    <input type="radio" className="add-buy-input" id="card" name="pay" value="card" />
                    <label for="card">Credit Card / Debit Card</label><br />
                    <input type="radio" className="add-buy-input" id="bank" name="pay" value="bank" />
                    <label for="bank">Internet Banking</label><br />
                    <input type="radio" className="add-buy-input" id="cash" name="pay" value="cash" />
                    <label for="cash">Cash on Dewlivery</label>
                </div>
                <br />
                <div className="arrival">
                    <h5>Choose A delivery speed</h5>
                    <input type="radio" className="add-buy-input" id="" name="delivery" value="" />
                    <label for="">Sometime after 23rd Century</label><br />
                    <input type="radio" className="add-buy-input" id="" name="delivery" value="" />
                    <label for="">Decembruary 1, 2018</label><br />
                    <input type="radio" className="add-buy-input" id="" name="delivery" value="" />
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

    const [curretnTab, setTab] = useState((props.tab) ? props.tab : "address");
    const tabs = [
        {
            name: "address",
            label: "Select Address",
            content: (<AddressBook user={props.location ? props.location.state.user : null} />)
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