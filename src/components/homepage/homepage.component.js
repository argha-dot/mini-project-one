import React, { Component } from 'react';
import "./homepage.component.css"
import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import one from "./1.jpg" 
import two from "./2.jpg" 
import three from "./3.jpeg"
import four from "./4.jpeg" 
import five from "./5.jpeg" 
import six from "./6.jpeg"  

export default class Homepage extends Component {
    render() {

        return (
            <div className="homepage-main" style={{ color: "whitesmoke" }}>

              
          <Carousel className="homepage-carousel">
                <Carousel.Item>
                  
                    <img src={one} fluid />
                  
                  <Carousel.Caption>
                    <h3>Lenovo IdeaCentre AIO 330 19.5-inch All-in-One Desktop </h3>
                    <p>₹ 25,000</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={two} fluid
                    alt="Second slide"
                  />

                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={three} fluid
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
              
          <CardDeck>
            <Card
            //  bg={variant.toLowerCase()}
            //  text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
             style={{ width: '18rem' }}>
              <Card.Img variant="top" src={four} fluid />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Img variant="top" src={five} fluid />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This card has supporting text below as a natural lead-in to additional
                  content.{' '}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Img variant="top" src={six} fluid />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This card has even longer content than the first to
                  show that equal height action.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </CardDeck>
</div>
        )
    }
}