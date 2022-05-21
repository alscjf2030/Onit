import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components";
import dayjs from "dayjs";
import 'dayjs/locale/ko'
import {useNavigate} from "react-router-dom";

import useResetStore from "../hooks/useResetStore";
import {ReactComponent as BsBell} from '../img/icon/bell.svg'
import {ReactComponent as Logo} from '../img/icon/logo-619.svg'
import PlanList from '../components/PlanList';

//redux
import {logout} from "../redux/modules/user";
import FCMtoken from "../components/FCMtoken";

dayjs.locale('ko')

const Main = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.user_info)
    const resetStore = useResetStore()
    const [isOpen, setMenu] = useState(false);
    const logoutBtn = () => {
        localStorage.removeItem('token')
        resetStore()
        dispatch(logout(navigate))
    };

    const toggleMenu = () => {
        setMenu(isOpen => !isOpen);
    }

    const nowDate = dayjs()
        .format('YYYY년MM월DD일 dddd')


    return (
        <Container>
          <FCMtoken/>
            <Logo
                className='logo'
                onClick={() => {navigate('/main')}}
            />
            <HeadBox>
                <div className='hamburger-bell'>
                    <BsBell style={{
                        cursor: "pointer",
                    }}/>
                    <button className="hamburger-btn" onClick={toggleMenu}>
                        <div className={`menu-trigger ${isOpen ? 'active' : ''}`}>
                            <span/>
                            <span/>
                            <span/>
                        </div>
                    </button>
                </div>
                <ShowMenu isOpen={isOpen}>
                    <div className="side-bar-header">
                        <button className="hamburger-btn" onClick={toggleMenu}>
                            <div className={`menu-trigger ${isOpen ? 'active' : ''}`}>
                                <span/>
                                <span/>
                                <span/>
                            </div>
                        </button>
                    </div>
                    <div className='member'>
                        <div className='member-img' style ={{
                            backgroundImage: `url(${userData?.profileImg})`,
                            backgroundSize: 'cover',
                        }}>
                        </div>
                        <p>{userData?.nickname || '손'} 님</p>
                    </div>
                    <div className='past-plan'
                         onClick={() => {
                             navigate('/past')
                         }}>
                        <p>지난 일정</p>
                    </div>
                    <div className='logout'
                         onClick={logoutBtn}
                    >
                        <p>로그아웃</p>
                    </div>
                </ShowMenu>
            </HeadBox>
            <UserInfo>
                <div className='member-profile'
                     style={{
                    backgroundImage: `url(${userData?.profileImg})`,
                }}/>
                <p>{userData.nickname ? userData.nickname : '손'} 님 <br/>{nowDate} 입니다.</p>
            </UserInfo>
            <PlanList/>
        </Container>
    )
}

export default Main

const Container = styled.div`
  background-color: #eee;
  min-height: 100vh;
  position:relative;

  .logo {
    position: absolute;
    left: 24px;
    top: 20px;
  }
`

const HeadBox = styled.div`
  background-color: #fff;
  width: 100%;
  height: 60px;
  padding: 10px 0;
  display: flex;
  justify-content: flex-end;

  .hamburger-bell {
    height: 100%;
    width: 40%;
    padding-right: 8px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .hamburger-btn {
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: inherit;
    outline: none;
  }

  .menu-trigger {
    position: relative;
    width: 20px;
    height: 17.6px;
    cursor: pointer;

    &, span {
      display: inline-block;
      transition: all 0.4s;
      box-sizing: border-box;
    }

    span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #000;
      border-radius: 4px;
    }

    span:nth-of-type(1) {
      top: 0;
    }

    span:nth-of-type(2) {
      top: 7.7px;
    }

    span:nth-of-type(3) {
      bottom: 0;
    }

    /* 2th bar 사라지고,  1st 3rd bar 회전하며 X  */

    &.active {
      span:nth-of-type(1) {
        transform: translateY(7.8px) rotate(-45deg);
      }

      span:nth-of-type(2) {
        opacity: 0;
      }

      span:nth-of-type(3) {
        transform: translateY(-7.7px) rotate(45deg);
      }
    }
  }
`

const UserInfo = styled.div`
  background-color: #eee;
  width: 100%;
  padding: 10px 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;

  p: first-of-type {
    font-size: 18px;
    margin: auto;
    justify-content: center;
    align-items: center;
  }
  
  .member-profile {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 1px solid #fff;
  }
`

const ShowMenu = styled.div`
  background-color: #ddd;
  width: 70%;
  //height: calc(100% - 40px);
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  padding: 10px;
  transform: ${({isOpen}) => `translateX(${isOpen ? 0 : '100%'})`};
  transition: transform 0.2s ease-in-out;

  .side-bar-header {
    display: flex;
    justify-content: flex-end;
    padding: 5px 0px 30px 0px;
  }

  .member {
    position: relative;
    width: 80%;
    height: 85px;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px auto;
    cursor: pointer;
  }

  .member-img {
    position: absolute;
    top: -40%;
    background-color: #eee;
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }

  .member > p {
    margin-top: 28px;
  }

  .past-plan {
    width: 80%;
    height: 40px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px auto;
    cursor: pointer;
  }

  .logout {
    width: 80%;
    height: 40px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0 auto;
  }
`
