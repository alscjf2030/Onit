import React, {useState} from 'react';
import styled from "styled-components";
import {Grid} from '../elements';
import theme from '../styles/theme';
import Penalty from '../components/Penalty';
import {ReactComponent as LeftArrow} from '../img/icon/arrowl.svg';
import KakaoMap from '../shared/KakaoMap';
import {useDispatch} from 'react-redux';
import {addPlan} from '../redux/modules/plan';
import {useNavigate} from "react-router-dom";
import {bomb} from "../img";
import SetPlan from '../components/SetPlan';

const AddPlans = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [penalty, setPenalty] = useState('');
    const clickHandler = () => {
        setComp(comp + 1)
    }
    const goBack = () => {
        if (comp > 0) {
            setComp(comp - 1)
        } else {
            navigate(-1)
        }
    }
    let [comp, setComp] = useState(0)
    let obj = {
        0: <SetPlan name={name} setName={setName} place={place} setPlace={setPlace} setTime={setTime} setDate={setDate} clickHandler={clickHandler}/>,
        1: <Penalty setPenalty={setPenalty} clickHandler={clickHandler}/>,
    }

    const create = () => {
        const data = {
            planName: name,
            planDate: `${date} ${time}`,
            location: {
                name: place.placeName,
                lat: place.lat,
                lng: place.lng,
                address: place.address
            },
            penalty,
        }
        dispatch(addPlan(data));
    }

    if (comp <= 1) {
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
                position: 'relative',
                textAlign: 'center',
                padding: "16px",
            }}>
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
                        fontSize: '20px',
                        fontWeight: 'bold',
                    }}>모임이 완성됐어요!</p>
            </div>
            <PlanDiv>
                <p>{name}</p>
                <h2>{year}년 {month}월 {day}일</h2>
                {hour > 12 ?
                    <h2> 오후 {hour - 12} 시 {minute} 분 입니다 </h2> :
                    <h2>오전 {hour} 시 {minute} 분 입니다</h2>}
                <p>{place.address}</p>
                <div className='penalty'>
                    <img alt='penalty icon' src={bomb}/>
                    <span>{penalty}</span>
                </div>
                <KakaoMap place={place.placeName} lat={place.lat} lng={place.lng}/>
            </PlanDiv>
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
                    onClick={create}>만들기!
                </button>
            </Grid>
        </Container>
    )
}

export default AddPlans;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.color.gray7}
`

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${theme.color.gray7};
`

const PlanDiv = styled.div`
  background-color: white;
  border-radius: 10px;
  border: 1px solid #fff;
  height: 80%;
  margin: 0 16px;

  p:first-of-type {
    font-weight: bold;
    padding: 15px 0 15px 15px;
    margin: 0;
  }

  p {
    padding: 5px 0 15px 15px;
  }

  h2 {
    margin: 0;
    padding: 0 0 10px 15px;
    font-size: 20px;
    font-weight: bold;
  }

  h2 + h2 {
    padding-bottom: 15px;
  }
  
  .penalty {
    display: flex;
    background: ${theme.color.gray5};
    border-radius: 10px;
    padding: 2px 2px 2px 5px;
    margin: 0 0 30px 15px;
    width: fit-content;
    align-items: center;
    justify-content: center;
  }

  span {
    font-size: 12px;
    padding: 0 5px;
  }
`