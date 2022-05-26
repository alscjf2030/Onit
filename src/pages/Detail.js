import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import {editPlan, deletePlan, getOnePlan, joinPlan} from "../redux/modules/plan";
import {useDispatch, useSelector} from "react-redux";
import {ReactComponent as LeftArrow } from '../img/icon/arrowl.svg';
import { deleteIcon, editIcon } from "../img";
import DetailMap from "./DetailMap";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const Detail = (props) => {
    const {planUrl} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user_info)
    const plan = useSelector(state => state.plan.showplan)
    const token = localStorage.getItem("token")
    const planDay = dayjs(plan?.planDate).format('MM월 DD일 dddd')
    const planTime = dayjs(plan?.planDate).format('A hh시 mm분')
    const handleShared = () => {
        if (navigator.share) {
            navigator.share({
                title: plan.planName,
                text: plan.planName,
                url: window.location.href
            })
                .then(() => console.log('성공'))
                .catch((err) => console.log(err))
        } else {
            Swal.fire({
                text: '공유하기가 지원되지 않는 환경 입니다.',
                icon: 'error',
            })
        }
    }

    useEffect(() => {
        if (!token) {
            Swal.fire({
                text: '로그인을 해 주세요',
                icon: 'error',
            })
            navigate(`/login/${planUrl}`)
        }
        dispatch(getOnePlan(planUrl))
    }, [])

    const handleModify = () => {
        if (user.nickname !== plan.writer) {
            Swal.fire({
                text: '작성자만 수정 가능합니다.',
                icon: 'error',
            })
            return
        } else {
            navigate(`/edit/${planUrl}`)
        }
    }

    const deletePlanBtn = () => {
        // if (user.nickname !== plan.writer) {
        //     Swal.fire({
        //         text: '작성자만 삭제 가능합니다.',
        //         icon: 'error',
        //     })
        //     return
        // }
        dispatch(deletePlan({planUrl, navigate}))
    }

    if (!plan) {
        return <div>loading...</div>
    }

    // console.log(plan)

    return (
        <Container>
            <HeadLine>
                <LeftArrow
                    style={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        top: 12,
                    }}
                    size="64px"
                    cursor="pointer"
                    onClick={() => {
                        navigate(`/main`)
                    }}
                />
                {plan.writer === user.nickname ?
                    <h2>선택하신 약속입니다</h2> : <h2>초대장</h2>
                }
            </HeadLine>

            <ScheduleBox>
                {user.nickname === plan.writer && (
                    <div style={{position: 'relative'}}>
                        <img alt="edit" src={editIcon} onClick={handleModify}/>
                        <img alt="delete" src={deleteIcon} onClick={deletePlanBtn}/>
                    </div>
                )}
                <h3>{planDay}</h3>
                <h3>{planTime}</h3>
                <p>{plan.planName}</p>
                <p>{plan?.locationDetail?.name}</p>
                <p>{plan?.penalty}</p>
            </ScheduleBox>
            <MapBox>
                {plan.locationDetail ? (
                    <DetailMap
                        {...plan.locationDetail}
                        ws={planUrl}
                    />
                ) : (
                    <div>loading...</div>
                )}
            </MapBox>
            <ButtonBox>
                {plan.writer === user.nickname ?
                    <button onClick={handleShared}>
                        공유하기
                    </button>
                    :
                    ( plan.member ?
                    <>
                        <button onClick={deletePlanBtn}>
                            일정 나가기
                        </button>
                    </>
                    :
                    <>
                        <button onClick={() => dispatch(joinPlan(planUrl))}>
                            참석하기
                        </button>
                        <button
                            onClick={() => {
                                navigate('/main')
                            }}>
                            거절하기
                        </button>
                    </>
                    )}
            </ButtonBox>
        </Container>
    )
}

export default Detail

const Container = styled.div`
  min-height: 100vh;
  background-color: #eee;
`

const HeadLine = styled.div`
  position: relative;
  width: 100%;
  text-align: center;

  h2 {
    font-size: 24px;
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 20px;
  }
`

const ScheduleBox = styled.div`
  background-color: #fff;
  border: none;
  border-radius: 5px;
  width: 90%;
  height: 30vh;
  margin: auto;

  h3: first-of-type {
    padding: 16px 10px;
    font-size: 24px;
    font-weight: bold;
  } h3 {
    font-size: 24px;
    font-weight: bold;
    padding: 0 10px 16px 10px
  } p {
    padding: 10px;
  };
  img: first-of-type {
    position: absolute;
    right: 42.67px;
  } img {
    position: absolute;
    right: 0;
    margin: 8px;
  }
`

const MapBox = styled.div`
  background-color: #ddd;
  border: none;
  border-radius: 5px;
  width: 90%;
  height: 40vh;
  margin: auto;
`

const ButtonBox = styled.div`
  width: 90%;
  margin: 20px auto;
  display: flex;

  button {
    background-color: #A1ED00;
    width: 100%;
    height: 100%;
    padding: 12px;
    color: black;
    border: none;
    border-radius: 10px;
  }

  button + button {
    margin-left: 10px;
  }
`