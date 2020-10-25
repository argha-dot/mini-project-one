import React from "react";
import "./about.us.component.css"

export default function AmongUs(props){
  return (
  <div>
    <div className="about-section">
      <h1>About Us </h1>
      <p>Meet the people behind this website.</p>
      <p>This is what we do.</p>
    </div>
    
    <h2 style={{ textAlign: "center", text:  "#ffffff" }}>Our Team</h2>
    <div className="row">
      <div className="column">
        <div className="card">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Vector_Face_wearing_Spectacles.png" alt="Aarav" style={{ width: "100%" }}></img>
          <div className="container">
            <h2>Aarav Varshney</h2>
            <p className="title">Founder</p>
            <p>CS Major, Math Minor.</p>
            <p>aarav.varshney_ug22@ashoka.edu.in</p>
            <p><button className="button"><a href="https://github.com/aarav22">Contact</a></button></p>
          </div>
        </div>
      </div>
    
      <div className="column">
        <div className="card">
          <img src="https://cdn.pixabay.com/photo/2014/04/02/14/10/female-306407_1280.png" alt="John" style={{ width: "100%" }}></img>
          <div className="container">
            <h2>Khushi Mehta</h2>
            <p className="title">Founder</p>
            <p>Keeps changing her major.</p>
            <p>khushi.mehta_ug22@ashoka.edu.in</p>
            <p><button className="button"><a href="https://github.com/khushi678">Contact</a></button></p>
          </div>
        </div>
      </div>

      <div className="column">
        <div className="card">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Vector_Face_wearing_Spectacles.png" alt="Argha" style={{ width: "100%" }}></img>
          <div className="container">
            <h2>Argha Chakrabarty</h2>
            <p className="title">Founder</p>
            <p>CS Major, Vintage Games Enthusiast</p>
            <p>argha.chakrabarty_ug22@ashoka.edu.in</p>
            <p><button className="button"><a href="https://github.com/argha-dot">Contact</a></button></p>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}
