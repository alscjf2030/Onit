import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Grid } from '../elements';
import theme from '../styles/theme';
import PlanName from '../components/PlanName';
import SetLocation from '../components/SetLocation';
import SetTime from '../components/SetTime';
import Penalty from '../components/Penalty';
import {ReactComponent as LeftArrow } from '../img/icon/arrowl.svg';
import KakaoMap from '../shared/KakaoMap';
import { useDispatch } from 'react-redux';
import { addPlan } from '../redux/modules/plan';
import {useNavigate} from "react-router-dom";

const AddPlans = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [name, setName] = React.useState('');
    const [place, setPlace] = React.useState('');
    const [time, setTime] = React.useState('');
    const [date, setDate] = React.useState('');
    const [penalty, setPenalty] = React.useState('');

    const clickHandler = () => {
        setComp(comp +1)
    }
    const goBack = () => {
        if(comp > 0) {
            setComp(comp -1)
        } else {
            navigate(-1)
        }
    }
    // console.log(Name, place, time, date)
    let [comp, setComp] = React.useState(0)
    let obj = {
        0: <PlanName name={name} setName={setName} clickHandler={clickHandler}/>,
        1: <SetLocation place={place} setPlace={setPlace} clickHandler={clickHandler}/>,
        2: <SetTime setTime={setTime} setDate={setDate} clickHandler={clickHandler}/>,
        3: <Penalty setPenalty={setPenalty} clickHandler={clickHandler} />,
    }

    const create = () => {
        const data = {
            planName: name,
            planDate: `${date} ${time}`,
            location: {
                name: place.name,
                lat: place.lat,
                lng: place.lng,
                address: place.address
            },
            penalty,
        }
        dispatch(addPlan({data, navigate}));
    }

    // const getContent = () => {
    //     switch (comp) {
    //         case 0:
    //             return <PlanName value={Name} eventHandler={eventHandler} clickHandler={clickHandler}/>
    //         case 1:
    //             return <SetLocation setPlace={setPlace} clickHandler={clickHandler}/>
    //         //...
    //         default:
    //             return null
    //     }
    // }

    if(comp <= 3) {
        return (
            <ContentWrap>
                <Grid padding="16px">
                    <LeftArrow
                        size="24px"
                        cursor="pointer"
                        onClick={goBack}
                    />
                </Grid>
                <Grid>
                    {obj[comp]}
                    {/*{getContent()}*/}
                </Grid>
            </ContentWrap>
        )
    }

    const year = date.split('-')[0]
    const month = date.split('-')[1]
    const day = date.split('-')[2]
    let hour = time.split(':')[0]
    const minute = time.split(':')[1]

    return (
        <Container>
            <div style={{
                position:'relative',
                textAlign: 'center',
                padding:"16px",
            }} >
                <LeftArrow
                    style={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        top: 8
                    }}
                    size="100px"
                    cursor="pointer"
                    onClick={goBack}
                />
                <p
                    style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                    }}>약속이 생성되었습니다!</p>
            </div>
            <Grid padding="16px">
                <PlanDiv>
                    <Grid padding="10px">
                        <p>{name}</p>
                        <br/>
                        <h2>{year}년 {month}월 {day}일</h2>
                        {hour > 12 ? <h2> 오후 {hour - 12} 시 {minute} 분 입니다 </h2> :
                            <h2>오전 {hour} 시 {minute} 분 입니다</h2>}
                        <br/>
                        <p>{place.address}</p>
                        <br/>
                        <p>{penalty}</p>
                    </Grid>
                    <KakaoMap place={place.name} lat={place.lat} lng={place.lng}/>
                </PlanDiv>
            </Grid>
            <Grid bottom="0" padding="16px">
                <button
                    style={{
                        backgroundColor: '#A1ED00',
                        width: '100%',
                        height: '100%',
                        padding: '12px',
                        color: 'black',
                        border: 'none',
                        borderRadius: '10px',
                    }}
                    onClick={create}>완성!</button>
            </Grid>
        </Container>
    )
}

export default AddPlans;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${theme.color.gray6};
`

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const PlanDiv = styled.div`
  background-color: white;
  border-radius: 10px;
  border: 1px solid #fff;
  padding: 6px;
  height: 75vh;
  
  p:first-of-type {
    font-weight: bold;
  }
  h2 {
    font-size: 20px;
    font-weight: bold;
  }
  h2 + h2 {
    padding-top: 5px;
    font-size: 20px;
    font-weight: bold;
  }
`