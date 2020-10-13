import React from "react";

const data = {
    name: "Argha Chakrabarty",
    mail: "ac380012@gmail.com",
    contact: "9499770953",
    dob: new Date(2001, 11, 24),
    city: "Ahmedabad"
}


export default function Overview() {
    return(
        <div className="over-sec">
            <h3 className="over-title">Account Overview</h3>
            <table className="over-info">
                <tbody>
                    <tr className="over-table-row">
                        <td className="table-something">Username</td>
                        <td className="table-otherthing">{data.name}</td>
                    </tr>
                    <tr className="over-table-row">
                        <td className="table-something">E-mail Id</td>
                        <td className="table-otherthing">{data.mail}</td>
                    </tr>
                    <tr className="over-table-row">
                        <td className="table-something">Contact No.</td>
                        <td className="table-otherthing">{data.contact}</td>
                    </tr>
                    <tr className="over-table-row">
                        <td className="table-something">Date of Birth</td>
                        <td className="table-otherthing">{data.dob.toDateString()}</td>
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