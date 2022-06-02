import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {ReactComponent as LeftArrow} from '../img/icon/arrowl.svg';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {getHistoryPlan} from "../redux/modules/plan";
import theme from "../styles/theme";
import {bomb} from "../img";

const PastPlan = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [page, setPage] = useState(1)

    const pastPlan = useSelector(state => state.plan.past.plans)
    // console.log(pastPlan)

    useEffect(() => {
        dispatch(getHistoryPlan(page))
    }, [])

    return (
        <Container>
            <HeadLine>
                <LeftArrow
                    style={{
                        position: 'absolute',
                        top: 10,
                        left: 20,
                    }}
                    size="64px"
                    cursor="pointer"
                    onClick={() => {
                        navigate('/main')
                    }}
                />
                <h2>나의 지난 일정</h2>
            </HeadLine>
            {pastPlan.length === 0 ? (
                    <NoList>
                        <p>
                            아직 약속이 없습니다!
                        </p>
                        <p>
                            즐거운 모임 온잇에서 어떠신가요?
                        </p>
                        <button
                            className='create-on-it'
                            onClick={() => {
                                navigate('/add')
                            }}
                        >온잇으로 모임 만들기
                        </button>
                    </NoList>
                ) :
                <SchedulesDiv>
                    {pastPlan?.map((plan, list) => {
                        const planDate = plan.planDate.substring(0, 6)
                        const planTime = plan.planDate.substring(10)
                        // console.log(plan)
                        return (
                            <Schedules
                                key={list}
                                onClick={() => {
                                    navigate(`/detail/${plan.planId}`)
                                }}
                            >
                                <h3>{planDate}</h3>
                                <h3>{planTime}</h3>
                                <p>{plan.planName}</p>
                                <p>{plan.address}</p>
                                <Penalty>
                                    <img className='bomb' alt='penalty icon' src={bomb}/>
                                    <span>{plan.penalty}</span>
                                </Penalty>
                            </Schedules>
                        )
                    })}
                </SchedulesDiv>
            }
            <TextDiv>
                <p>최근 6개월 이내의 지난 약속만 보여집니다.</p>
            </TextDiv>
        </Container>
    )
}

export default PastPlan

const Container = styled.div`
  background-color: ${theme.color.gray7};
  height: 100%;
`

const TextDiv = styled.div`
  margin-top: 30px;
  p {
    color: ${theme.color.gray1};
    display: flex;
    justify-content: center;
  }
`

const HeadLine = styled.div`
  background-color: ${theme.color.white};
  position: relative;
  width: 100%;
  text-align: center;
  margin-bottom: 16px;

  h2 {
    font-size: 20px;
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 20px;
  }
`

const NoList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto 0;
  height: 80%;

  p {
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 10px;
    color: ${theme.color.gray1};
  }

  .create-on-it {
    width: 70%;
    height: 45px;
    background-color: ${theme.color.green};
    border-radius: 10px;
    border: none;
    font-weight: bold;
    margin-top: 20px;
    color: #181818;
    font-size: 16px;
  }
`

const SchedulesDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 90%;
  margin: 0 auto;
`

const Schedules = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto 20px auto;
  width: 45%;
  border: none;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 15px #d1d1d1;

  h3 {
    font-weight: bold;
    font-size: 16px;
    padding-bottom: 5px;
  }

  h3:last-of-type {
    padding-bottom: 15px;
  }

  p {
    font-size: 14px;
    padding-bottom: 5px;
  }

  p:last-of-type {
    padding-bottom: 15px;
  }
`

const Penalty = styled.div`
  display: flex;
  background: ${theme.color.gray5};
  border-radius: 10px;
  padding: 5px 10px 5px 15px;
  width: fit-content;
  align-items: center;
  bottom: 1rem;

  span {
    font-size: 12px;
    margin: 0 5px;
  }
`;