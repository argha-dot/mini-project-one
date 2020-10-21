import Axios from "axios";
import React, { useState } from "react";
// import Popup from 'reactjs-popup';

const data = {
    name: "NA",
    mail: "NA",
    contact: "NA",
    dob: new Date(),
    city: "NA"
}

// app.post('/api/update_user', user_controller.update_user_info) 
export default function Overview(props) {

    const [contact, setContact] = useState("");


    function updateContact() {
        console.log("q")
        // setContact(document.getElementsByClassName("contact-input")[0]["value"])
        Axios({
            method: "POST",
            url: `/api/update_user`,
            data: { _id: props.user, contact: contact, address: [] }
        })
        .then(response => console.log("Response from account overview: ", response))
        .catch(err => console.log("Update contact error: ", err))
    }

    // const Pop = () => (
    //     <Popup trigger={
    //         <button
    //             style={{ backgroundColor: "transparent", color: "white", border: "none" }}>
    //             <i class="fas fa-pen"></i>
    //         </button>} 
    //     modal>
    //         <div style={{ backgroundColor: "white" }}>
    //             {contact}
    //             <label for="fname">Contact No:</label><br />
    //             <input type="text" className="contact-input"/>
    //             <button onClick={() => updateContact}>
    //                 Submit
    //             </button>
    //         </div>
    //     </Popup>
    // )
    
    return(
        <div className="over-sec">
            { console.log("hello from over.profile", props.user) }
            <h3 className="over-title">Account Overview</h3>
            <table className="over-info">
                <tbody>
                    <tr className="over-table-row">
                        <td className="table-something">Username</td>
                        <td className="table-otherthing">{(props.user) ? props.user.name : data.name}</td>
                    </tr>
                    <tr className="over-table-row">
                        <td className="table-something">E-mail Id</td>
                        <td className="table-otherthing">{(props.user) ? props.user.email : data.mail}</td>
                    </tr>
                    <tr className="over-table-row">
                        <td className="table-something">Date of Birth</td>
                        <td className="table-otherthing">{data.dob.toDateString()}</td>
                    </tr>
                    <tr className="over-table-row">
                        <td className="table-something">Contact</td>
                        <td className="table-otherthing">{(props.user) ? props.user.contact : data.contact}</td>
                        <td className="table-anotherthing">            
                            {/* <Pop></Pop> */}
                        </td>
                    </tr>
                    <tr className="over-table-row">
                        <td className="table-something">City</td>
                        <td className="table-otherthing">{data.city}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}