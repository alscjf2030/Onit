import React from 'react';
import ReactRain from 'react-rain-animation'
import 'react-rain-animation/lib/style.css'

const Rain = (props) => {

    return (
        <div>
            <ReactRain numDrops='100'/>
        </div>
    );
}

export default Rain;