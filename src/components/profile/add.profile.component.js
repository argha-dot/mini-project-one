import React, {useState} from "react";
import Axios from "axios"



export default function Address(props) {

    const [user, setUser] = useState(props.user ? props.user : "");
    const [usrAdd, setUsrAdd] = useState(props.user ? props.user.address : [])
    const [newAdd, setnewAdd] = useState({name: "", address: ""});
    const [add, setAdd] = useState(false);
    // new_addresss = user.address;
    // new_address.push({name: "", address: ""}); 
    
    // console.log(user);

    function updateAddress() {
        console.log("q")
        Axios({
            method: "POST",
            url: `/api/update_user`,
            data: { userId: user._id, contact: "", address: user.address }
        })
            .then(response => console.log("Response from account overview: ", response))
            .catch(err => console.log("Update contact error: ", err))
    }

    return(
        <div className="addr-main">
            <h3 className="addr-title">Addresses</h3>
            <div className="addr-container">
                {(usrAdd ? usrAdd:[]).map((addr) => {
                    return(
                        <div key={addr.name} className="addr-content">
                            <div className="addr-bar">
                                <div>{addr.name}</div>
                                <div className="addr-btns">
                                    <button className="addr-button"><i className="far fa-trash-alt"></i></button>
                                    <button className="addr-button"><i className="fas fa-pen"></i></button>
                                </div>
                            </div>
                            <div className="addr-addr">{addr.address}</div>
                        </div>
                    )
                })}
                {
                    add && (
                        <div className="addr-content-add">
                            <div className="addr-bar-add">
                                <input className="addr-title-add" placeholder="Title" onChange={(e) => {setnewAdd({...newAdd, name: e.target.value}); console.log(newAdd);}} contentEditable="true"></input>
                                <div className="addr-btns-add">
                                    <button onClick={() => setAdd(false)} className="addr-button-add"><i className="far fa-trash-alt"></i></button>
                                    <button className="addr-button-add">✔</button>
                                    {/* onClick={() => { setUsrAdd(usrAdd) }} */}
                                </div>
                            </div>
                            <input placeholder="Address" onChange={(e) => { setnewAdd({ ...newAdd, address: e.target.value })}} className="addr-addr-add"></input>
                        </div>
                    )
                }
                <button onClick={() => setAdd(true)} className="add-more" style={{ width: "5rem", height: "auto" }}>
                    <svg className="add-more-sign" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.3 492.3"><polygon points="256 236.3 256 110 236.3 110 236.3 236.3 110 236.3 110 256 236.3 256 236.3 382.4 256 382.4 256 256 382.4 256 382.4 236.3 " /><path d="M246.2 0C110.4 0 0 110.4 0 246.2s110.4 246.2 246.2 246.2 246.2-110.4 246.2-246.2S381.9 0 246.2 0zM246.2 472.6c-124.9 0-226.5-101.6-226.5-226.5S121.3 19.7 246.2 19.7s226.5 101.6 226.5 226.5S371 472.6 246.2 472.6z" /></svg>
                </button>
            </div>
            
        </div>
    )
}