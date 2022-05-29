import React, {useState, useEffect} from 'react'
import {Map, MapMarker, CustomOverlayMap} from 'react-kakao-maps-sdk'
import styled from 'styled-components';
import {dest_marker, my_marker, ol_marker} from '../img';
import {useNavigate} from 'react-router-dom';
import theme from '../styles/theme';

const DetailMap = (props) => {
    const nav = useNavigate();
    const [state, setState] = useState({
        center: {
            lat: props.lat,
            lng: props.lng,
        },
        errMsg: null,
        isLoading: true,
    })
    const [dest, setDest] = useState({
        center: {
            lat: props.lat,
            lng: props.lng,
        },
        errMsg: null,
        isLoading: true,
    })

    useEffect(() => {
        //현재 내위치 얻기
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(
                position => {
                    setState(prev => ({
                        ...prev,
                        center: {
                            lat: position.coords.latitude.toFixed(10), // 위도
                            lng: position.coords.longitude.toFixed(10), // 경도
                        },
                        isLoading: false,
                    }));
                })}}, [])

    return (
        <>
            <Map // 지도를 표시할 Container
                center={dest.center}
                style={{
                    // 지도의 크기
                    width: "100%",
                    height: "100%",
                }}
                level={4} // 지도의 확대 레벨
            >
                <MapMarker
                    position={
                        state.center
                    }
                    image={{
                        src: ol_marker,
                        size: {width: 33, height: 33},
                    }}
                />
                <CustomOverlayMap position={state.center}>
                    <Dest>
                        내 위치
                    </Dest>
                </CustomOverlayMap>
                <MapMarker
                    position={
                        dest.center
                    }
                    image={{
                        src: dest_marker,
                        size: {width: 33, height: 33},
                    }}
                />
                <CustomOverlayMap position={dest.center}>
                    <Dest>
                        {props.name}
                    </Dest>
                </CustomOverlayMap>
                {props.ws ?
                    <Share onClick={() => nav(`/details/${props.ws}`)}>실시간 위치 공유</Share>
                    :
                    null
                }
            </Map>
        </>
    )
}

const Dest = styled.div`
  background-color: ${theme.color.black};
  color: white;
  padding: 9px;
  border-radius: 5px;
  margin-bottom: 6.5rem;
`;

const Share = styled.button`
  position: absolute;
  left: 33%;
  right: 33%;
  bottom: 14%;
  z-index: 2;
  background: ${theme.color.green};
  color: ${theme.color.black};
  font-weight: bold;
  border: 0px;
  border-radius: 7px;
  padding: 6px;
  box-shadow: 0 0 10px ${theme.color.gray3};
`;
export default DetailMap;