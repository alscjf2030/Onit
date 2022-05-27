import React, {useRef, useState} from "react";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {ReactComponent as BsBell} from '../img/icon/bell.svg'
import useResetStore from "../hooks/useResetStore";
import {logout} from "../redux/modules/user";
import {useNavigate} from "react-router-dom";
import {editPic} from "../img";
import {ReactComponent as Logo} from '../img/icon/logo-619.svg'
import MobilePortal from "./MobilePortal";
import {changePic} from "../redux/modules/user";
import theme from "../styles/theme";


const SideMenu = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const resetStore = useResetStore()
    const userData = useSelector(state => state.user.user_info)
    const [isOpen, setMenu] = useState(false);
    const hidden = useRef(null);

    const logoutBtn = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('FCMtoken')
        resetStore()
        dispatch(logout(navigate))
    };

    const toggleMenu = () => {
        setMenu(isOpen => !isOpen);
    }
    const selectFile = (e) => {
        dispatch(changePic(e.target.files[0]))
    }
    const handleClick = (e) => {
        hidden.current.click();
    }

    return (
        <HeadBox>
            <Logo
                className='logo'
                onClick={() => {
                    navigate('/main')
                }}
            />
            <div className='hamburger-bell'>
                <BsBell style={{
                    cursor: "pointer",
                }}/>
                <button className="hamburger-btn" onClick={toggleMenu}>
                    <MenuTrigger active={isOpen}>
                        <span/>
                        <span/>
                        <span/>
                    </MenuTrigger>
                </button>
            </div>
            <MobilePortal>
                <ShowMenu isOpen={isOpen}>
                    <div className="side-bar-header">
                        <button className="hamburger-btn" onClick={toggleMenu}>
                            <MenuTrigger active={isOpen}>
                                <span/>
                                <span/>
                                <span/>
                            </MenuTrigger>
                        </button>
                    </div>
                    <div className='member'>
                        <div className='member-img'
                             style={{
                            backgroundImage: `url(${userData?.profileImg})`,
                            backgroundSize: 'cover',
                        }}>
                            <img
                                alt='edit'
                                src={editPic}
                                style={{display: "flex", marginLeft: "auto"}}
                                onClick={handleClick}
                            />
                        </div>
                        <p>{userData?.nickname || '손'} 님</p>
                    </div>
                    <div className='button'
                         onClick={() => {
                             navigate('/past')
                         }}>
                        <p>지난 일정</p>
                    </div>
                    <div className='button'
                         onClick={logoutBtn}
                    >
                        <p>로그아웃</p>
                    </div>
                </ShowMenu>
                <input
                    type="file"
                    onChange={selectFile}
                    ref={hidden}
                    id="fileUpload"
                    accept="image/jpeg, image/png, image/jpg"
                    style={{display: "none"}}
                />
            </MobilePortal>
        </HeadBox>
    )
}

export default SideMenu;

const HeadBox = styled.div`
  background-color: #fff;
  width: 100%;
  height: 60px;
  padding: 10px 0;
  display: flex;
  justify-content: flex-end;
  box-shadow: 0 0 10px #d1d1d1;

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
`

const MenuTrigger = styled.div`
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

  span:nth-of-type(1) {
    transform: ${({active}) => active ? 'translateY(7.8px) rotate(-45deg)' : 'none'};
  }

  span:nth-of-type(2) {
    opacity: ${({active}) => active ? 0 : 1};
  }

  span:nth-of-type(3) {
    transform: ${({active}) => active ? 'translateY(-7.7px) rotate(45deg)' : 'none'};
  }
`

const ShowMenu = styled.div`
  z-index: 2;
  background-color: ${theme.color.gray7};
  width: 70%;
  visibility: ${({isOpen}) => isOpen ? 'visible' : 'hidden'};
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px;
  transform: ${({isOpen}) => `translateX(${isOpen ? 0 : '100%'})`};
  transition: visibility 0.1s, transform 0.2s ease-in-out;

  .side-bar-header {
    display: flex;
    justify-content: flex-end;
    padding: 5px 0 30px 0;

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

  .button {
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
`