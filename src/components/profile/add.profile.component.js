import React from "react";

const data = [
    {
        "name": "Home",
        "address": "Apt. 255, 632 Corwin Plains, Lakeville 52608 Michigan"
    },
    {
        "name": "Office",
        "address": "Suite 311, 176 Cordell Alley, North East Hailie 32116-5544 West Virginia"
    },
    {
        "name": "Mom Home",
        "address": "Suite 874, Kirlin Alley 0759 Sarina Fields, New Lafayette 80453 Montana"
    },
    {
        "name": "Brother Home",
        "address": "Suite 311, 176 Cordell Alley, North East Hailie 32116-5544 West Virginia"
    },
    {
        "name": "Dad Office",
        "address": "Suite 311, 176 Cordell Alley, North East Hailie 32116-5544 West Virginia"
    }
]


export default function Address(props) {
    return(
        <div className="addr-main">
            <h3 className="addr-title">Addresses</h3>
            <div className="addr-container">
                {data.map((addr, key) => {
                    return(
                        <div className="addr-content">
                            <div key={key} className="addr-bar">
                                <div>{addr.name}</div>
                                <div className="addr-btns">
                                    <button className="addr-button"><i className="far fa-trash-alt"></i></button>
                                    <button className="addr-button"><i class="fas fa-pen"></i></button>
                                </div>
                            </div>
                            <div key={key} className="addr-addr">{addr.address}</div>
                        </div>
                    )
                })} 
            </div>
            
        </div>
    )
}