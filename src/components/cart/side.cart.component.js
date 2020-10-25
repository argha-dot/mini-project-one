import React from "react";
import { Link } from "react-router-dom";


export default function CartSide(props) {
    return(
        <div className="cart-side-main">
            <h5 className="price-title">ORDER SUMMARY</h5>
            
            <table className="price-details">
                <tbody>
                    <tr className="price-details-row">
                        <td className="price-something">Subtotal</td>
                        <td className="price-otherthing">₹{(props.total).toFixed(2)}</td>
                    </tr>
                    <tr className="price-details-row">
                        <td className="price-something">Estimated Delivery & Handling</td>
                        <td className="price-otherthing">+₹{(500).toFixed(2)}</td>
                    </tr>
                    <tr className="price-details-row">
                        <td className="price-something">GST Applied (12%): </td>
                        <td className="price-otherthing">+₹{(12*props.total/100).toFixed(2)}</td>
                    </tr>
                    <tr className="price-details-row">
                        <td className="price-something">Discount Applied*</td>
                        <td className="price-otherthing">-₹{(props.total + (12 * props.total / 100) + 500).toFixed(2)}</td>
                    </tr>
                    <tr className="price-details-row">
                        <td className="price-something"></td>
                        <td className="price-otherthing"></td>
                    </tr>
                    <tr className="price-details-row">
                        <td className="price-something">Total</td>
                        <td className="price-otherthing">₹{(0).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <div className="buy-button">
                <Link to={{
                    pathname: `/buy`,
                    state: { user: props.user }}}>
                    Checkout
                </Link>
            </div>
            <p className="goof">*On the account of this being a fake website</p>
            
        </div>
    )
}