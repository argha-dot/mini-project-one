import React from 'react';
import './popup.css';

export default function Popup(props) {
    return (
        <div className='popup'>
            <div className='popup_inner'>
                <div>{props.text}</div>
                <button className="popup-close" onClick={props.closePopup}><i class="fas fa-times-circle"></i></button>
            </div>
        </div>
    );
}