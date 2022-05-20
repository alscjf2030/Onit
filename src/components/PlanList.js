import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

import dayjs from "dayjs";
import 'dayjs/locale/ko'

import {Text} from "../elements";
import theme from "../styles/theme";
import {ReactComponent as Plus} from '../img/icon/Plus.svg'

import {getMorePlan, getPlan, setLoading} from "../redux/modules/plan";

dayjs.locale('ko')

const PlanList = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const userData = useSelector(state => state.user.user_info);
    const totalPage = useSelector(state => state.plan.totalPage);
    const loading = useSelector((state) => state.plan.loading)
    const planList = useSelector(state => state.plan.plans);
    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight
        const scrollTop = document.documentElement.scrollTop
        const clientHeight = document.documentElement.clientHeight
        if (scrollTop + clientHeight >= scrollHeight && loading === 'idle' && totalPage >= page) {
            setPage(page + 1)
        }
    }
    useEffect(() => {
        if (userData) {
            dispatch(getPlan(1))
        }
    }, [userData])

    useEffect(() => {
        if (userData && page > 1) {
            dispatch(getMorePlan({page: page}))
        }
    }, [userData, page])

    useEffect(() => {
        if (loading === 'succeeded') {
            dispatch(setLoading('idle'))
        }
    }, [loading])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    if (!planList.length && loading === 'pending') {
        return 'loading...'
    }
    return (
        <>
            <List>
                {planList.length > 0 ? (
                    <>
                        {planList.map((plan, idx) => {
                            const planDate = plan.planDate.split(" ")
                            const date = planDate.splice(0, 3).join(" ")
                            const time = planDate.pop().split(":")
                            return (
                                <div className='lists'
                                     key={idx}
                                     onClick={() => {
                                         navigate(`/detail/${plan.url}`)
                                     }}
                                >
                                    <h3>{date}</h3>
                                    <h3>{
                                    time[0] > 12 ?
                                    (time[0] -= 12,
                                    "오후 " + time.join("시 ") + "분까지")
                                    :
                                    "오전 " + time.join("시 ") + "분까지"
                                    }</h3>
                                    <p>{plan.planName}</p>
                                    <p>{plan.locationName}</p>
                                    <p>{plan.penalty}</p>
                                </div>
                            )
                        })}
                        <Plus className='plus-icon' src='Plus.svg'
                              onClick={() => {
                                  navigate('/add')
                              }}/>
                    </>
                ) : (
                    <div className='no-list'>
                        <p size="14px" color={theme.color.gray1}>
                            아직 약속이 없습니다!
                        </p>
                        <p size="14px" color={theme.color.gray1}>
                            즐거운 모임 온잇에서 어떠신가요?
                        </p>
                        <button
                            className='create-on-it'
                            onClick={() => {
                                navigate('/add')
                            }}
                        >온잇으로 모임 만들기
                        </button>
                    </div>
                )}
            </List>
        </>
    )
}

export default PlanList;

const List = styled.div`
  padding: 0 30px;
  margin-bottom: 30px;
  overflow: hidden;
  //text-align: center;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }

  .create-on-it {
    width: 70%;
    height: 35px;
    background-color: #A1ED00;
    border-radius: 10px;
    border: none;
    font-weight: bold;
    margin-top: 20px;
  }

  .lists:first-of-type {
    display: flex;
    justify-content: center;
    flex-direction: column;

    background-color: #A1ED00;
    width: 100%;
    height: 25vh;
    font-size: 20px;
  }

  .lists:first-of-type > h3 {
    font-size: 24px;
  }

  .lists {
    background-color: white;
    width: 100%;
    height: 20vh;
    border: 1px none #ddd;
    border-radius: 10px;
    padding: 16px 10px;
    margin-bottom: 16px;
  }

  h3 {
    padding-bottom: 8px;
    font-weight: bold;
    font-size: 20px;
  }

  h3 + h3 {
    padding-bottom: 16px;
  }

  p {
    padding-bottom: 8px;
  }

  .no-list {
    text-align: center;
    width: 100%;
    padding: 10px 0;
    margin-top: 130px;
    margin-bottom: 30px;
  }
  
  .no-list > p {
    font-size: 14px;
    color: ${theme.color.gray1};
  }

  .plus-icon {
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
`