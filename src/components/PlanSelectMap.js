/* eslint-disable no-undef */
import React, {useEffect, useRef, useState} from 'react';
import {Map, MapMarker, CustomOverlayMap} from 'react-kakao-maps-sdk';
import {Button, Grid, Text} from '../elements';
import styled from 'styled-components';
import Headerbar from '../shared/Headerbar';
import theme from '../styles/theme';
import {dest_marker, my_marker} from '../img'

const PlanSelectMap = props => {
    const inputref = useRef(); //인풋데이터
    const [keyword, setKeyword] = useState(''); //defult값 빼면 에러남..
    const [info, setInfo] = useState(); //클릭시 나올 정보==>하단 바로 빼기
    // const [markers, setMarkers] = useState([]); //마커들
    const [map, setMap] = useState(); //지도 데이터
    const [datas, setDatas] = useState(); //리스트 검색 시 들어오는 데이터
    const [isInput, setIsInput] = useState(false); //인풋 눌럿는지 체크
    const [isdata, setIsData] = useState(false);
    const [selectlist, setSelectlist] = useState({
        //리스트 클릭시 들어갈 데이터
        position: {
            lat: null,
            lng: null,
        },
        content: '',
        address_name: '',
        road_address_name: '',
        place_url: '',
    });

    useEffect(() => {
        //현재 내위치 얻기
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(
                position => {
                    setSelectlist(prev => ({
                        ...prev,
                        position: {
                            lat: position.coords.latitude.toFixed(10), // 위도
                            lng: position.coords.longitude.toFixed(10), // 경도
                        },
                        isLoading: false,
                    }));
                },
            )}
    }, []);


    // var geocoder = new kakao.maps.services.Geocoder();
    // searchAddrFromCoords(selectlist.position, address);
    // function searchAddrFromCoords(coords, callback) {
    // // 좌표로 행정동 주소 정보를 요청합니다
    // geocoder.coord2RegionCode(coords.lng, coords.lat, callback);
    // }
    // function address(callback) {
    //     setKeyword(callback[0].region_3depth_name)
    // }

    useEffect(() => {
        if (!map) return;
        const ps = new kakao.maps.services.Places();
        if (keyword !== ''){
        ps.keywordSearch(keyword, (data, status, _pagination) => {
            if (status === kakao.maps.services.Status.OK) {
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                const bounds = new kakao.maps.LatLngBounds();
                let markers = [];
                for (var i = 0; i < 10; i++) {
                    // @ts-ignore
                    markers.push({
                        position: {
                            lat: data[i].y,
                            lng: data[i].x,
                        },
                        content: data[i].place_name,
                        address_name: data[i].address_name,
                        road_address_name: data[i].road_address_name,
                        place_url: data[i].place_url,
                    });
                    // @ts-ignore
                    bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
                }
                // setMarkers(markers);
                setDatas(data);

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds);
            }
        });
    }}, [map, keyword]);
    const inputdatabutton = event => {
        setKeyword(inputref.current.value);
    };
    return (
        <>
            <Section>
                <MainModal>
                    <Headerbar
                        isback
                        _onClickClose={() => {
                            props.setShowMap(false);
                        }}
                        text="장소검색"
                    ></Headerbar>
                    <Grid padding="16px">
                        <InputDest
                            ref={inputref}
                            onChange={e => {
                                setKeyword(e.target.value);
                            }}
                            onClick={() => {
                                setIsInput(true);
                            }}
                        ></InputDest>
                        <Search onClick={inputdatabutton}>
                        </Search>
                    </Grid>
                    {isInput && (
                        <Grid padding="12px">
                            {datas &&
                                datas.map((point, index) => (
                                    <div key={'datas' + index}>
                                        <Grid
                                            _onClick={() => {
                                                setIsData(true);
                                                const markerdata = {
                                                    position: {
                                                        lat: point.y,
                                                        lng: point.x,
                                                    },
                                                    content: point.place_name,
                                                    address_name: point.address_name,
                                                    road_address_name: point.road_address_name,
                                                    place_url: point.place_url,
                                                };
                                                setSelectlist(markerdata);
                                                setIsInput(false);
                                                props.setName(point.place_name);
                                                props.setAddress(point.address_name);
                                                props.setLat(point.y);
                                                props.setLng(point.x);
                                                props.setShowMap(true);
                                                const bounds = new window.kakao.maps.LatLngBounds();
                                                bounds.extend(
                                                    new window.kakao.maps.LatLng(point.y, point.x),
                                                );
                                                map.setBounds(bounds);
                                            }}
                                        >

                                            <Text size={'16px'}>{point.place_name}</Text>
                                            <Text size={'11px'} color={theme.color.gray4}>
                                                {point.address_name}
                                            </Text>
                                        </Grid>
                                        <hr style={{color: '#E0E0E0'}}/>
                                    </div>
                                ))}
                        </Grid>
                    )}
                    {isdata && (
                        <InfoMap>
                            <div>
                                <div style={{padding: '0px 0px 5px 0px'}}>
                                    <Text size="18px" bold>
                                        {selectlist.content}
                                    </Text>
                                </div>
                                <Text size="12px">{selectlist.road_address_name}</Text>
                            </div>
                            <div
                                style={{
                                    marginLeft: 'auto',
                                    display: "flex",
                                }}
                            >
                                <DestInfo
                                    onClick={() =>
                                        window.open(selectlist.place_url)}
                                >
                                    <P>정보</P>
                                </DestInfo>
                                <Button
                                    is_green={isdata}
                                    able={!isdata}
                                    is_disabled={!isdata}
                                    height="40px"
                                    width="80px"
                                    _onClick={() => {
                                        props.setShowMap(false)
                                    }}
                                ><P>선택</P></Button>
                            </div>
                        </InfoMap>
                    )}
                    <Map
                        center={
                            selectlist.position
                        }
                        style={{
                            width: '90%',
                            height: '80%',
                            margin: 'auto'
                        }}
                        level={3}
                        onCreate={setMap}
                    >
                        {selectlist ? <MapMarker
                                position={selectlist.position}
                                onClick={() => setInfo(selectlist)}
                                image={{
                                    src: dest_marker,
                                    size: {width: 33, height: 33},
                                }}
                            />
                            :
                            null
                        }
                    </Map>
                </MainModal>
            </Section>
        </>
    );
};

const Section = styled.div`
  position: absolute;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);
`;

const MainModal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  background-color: white;
`;

const InputDest = styled.input`
  width: 100%;
  height: 29px;
  padding: 8px;
  background: ${theme.color.white};
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 5px;
`;

const Search = styled.div`
  position: absolute;
  top: 8.1%;
  right: 6%;
`;

const InfoMap = styled.div`
  padding: 20px;
  display: flex;
  width: 100%;
  z-index: 10;
  background-color: ${theme.color.white};
  position: absolute;
  bottom: 0;
`;

// const MarkerDetail = styled.div`
// font-family: pretendard;
// margin-bottom: 130px;
// background: white;
// padding: 10px;
// border-radius: 7px;
// `;

const DestInfo = styled.button`
  margin-top: auto;
  width: 80px;
  height: 100%;
  border-radius: 10px;
  margin: 0px 5px 0px auto;
  border: 0px;
  background: #CCCCCC;
  padding: 5px;
`
const P = styled.p`
  font-weight: ${theme.fontWeight.semiBold};
  font-size: 14px;
`;
export default PlanSelectMap;