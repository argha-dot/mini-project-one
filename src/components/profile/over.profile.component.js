import React from "react";

const data = {
    name: "NA",
    mail: "NA",
    contact: "NA",
    dob: new Date(),
    city: "NA"
}

// app.post('/api/update_user', user_controller.update_user_info) 
export default function Overview(props) {

    // Axios({
    //     method: "POST",
    //     url: `/api/update_user?productId=${productId}`,
    //     data: { _id: userId, contact: contact, homeAddress: homeAdd, collegeAddress: collAdd }
    // })
    //     .then(response => console.log("Response from account overview: ", response))
    //     .catch(err => console.log("Add to Cart Error: ", err))
    
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