import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import "./buy.component.css"


export default function Buy(props){
    return (
        <div className="buy-container">
        {console.log("From buy page: ", props.location ? props.location.state.user : null)}
        <h1 className="buy-title">CHECKOUT</h1>
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label style={{color:"#ffffff"}}>Name</Form.Label>
                <Form.Control type="email" placeholder="Enter name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label style={{color:"#ffffff"}}>Mobile No.</Form.Label>
                <Form.Control type="password" placeholder="Mobile No." />
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
                <Form.Label style={{color:"#ffffff"}}>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
                <Form.Label style={{color:"#ffffff"}}>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                <Form.Label style={{color:"#ffffff"}}>City</Form.Label>
                <Form.Control />
                </Form.Group>
        
                <Form.Group as={Col} controlId="formGridState">
                <Form.Label style={{color:"#ffffff"}}>State</Form.Label>
                <Form.Control />
                </Form.Group>
            
                <Form.Group as={Col} controlId="formGridZip">
                <Form.Label style={{color:"#ffffff"}}>Zip</Form.Label>
                <Form.Control />
                </Form.Group>
            </Form.Row>

            <Form.Group id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Confirm
            </Button>
        </Form>
    </div>
    )
}