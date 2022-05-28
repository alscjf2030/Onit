import React from 'react';
import { sunny, cloudy, rainy, snowy, unknown } from "../img";
import styled from "styled-components";

const Weather = (props) => {
    const condition = props.props
    return (
        <>
            {condition === "맑음" ?
                <Sunny  alt="weather" src={sunny}/>
                :
                null
            }
            {condition === "흐림" ?
                <Cloudy  alt="weather" src={cloudy}/>
                :
                null
            }
            {condition === "눈" ?
                <Snowy  alt="weather" src={snowy}/>
                :
                null
            }
            {condition === "비" ?
                <Rainy  alt="weather" src={rainy}/>
                :
                null
            }
            {condition === "없음" ?
                <Unknown  alt="weather" src={unknown}/>
                :
                null
            }
        </>
    )
}

const Sunny = styled.img`
    position: absolute;
    left: 12rem;
    top: 3.5rem;
`;
const Cloudy = styled.img`
    position: absolute;
    left: 12.5rem;
    top: 1.563rem;
`;
const Rainy = styled.img`
    position: absolute;
    left: 12.5rem;
    top: 3.125rem;
`;
const Snowy = styled.img`
    position: absolute;
    left: 12.5rem;
    top: 3.125rem;
`;
const Unknown = styled.img`
    position: absolute;
    left: 12.5rem;
    top: 2.5rem;
`;
export default Weather;