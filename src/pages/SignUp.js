import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setLoading, signUp} from "../redux/modules/user";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {ReactComponent as LeftArrow } from '../img/icon/arrowl.svg';
import Swal from "sweetalert2";

import eyeOn from '../img/icon/eyeOn.svg'
import eyeOff from '../img/icon/eyeOff.svg'

const SignUp = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [nickname, setNickname] = useState('')
    const [pw, setPw] = useState('')
    const [pwCheck, setPwCheck] = useState('')
    const [hidePassword, setHidePassword] = useState(true)
    const [hidePasswordCheck, setHidePasswordCheck] = useState(true)
    const loading = useSelector((state) => state.user.loading)

    const toggleHidePassword = () => {
        setHidePassword(!hidePassword)
    }
    const toggleHidePasswordCheck = () => {
        setHidePasswordCheck(!hidePasswordCheck)
    }

    const handleSignUp = () => {
        if (!username || !nickname || !pw || !pwCheck) {
            return Swal.fire({
                // title: 'Error!',
                text: '내용을 모두 입력해 주세요!',
                icon: 'error'
            })
        }
        if (pw !== pwCheck) {
            return Swal.fire({
                // title: 'Error!',
                text: '비밀번호가 일치하지 않습니다!',
                icon: 'error'
            })
        } else {
            const data = {
                username,
                nickname,
                password: pw,
            }
            dispatch(signUp({data, navigate}));
        }
    };

    const handleKeyPress = e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSignUp();
        }
    };

    if (loading === 'pending') {
        return 'loading...'
    }
    // if (loading === 'failed') {
    //     setTimeout(() => {
    //         dispatch(setLoading('idle'))
    //     }, 1000)
    //     return 'failed...'
    // }

    return (
        <>
            <HeadLine>
                <LeftArrow
                    style={{
                      position: "absolute",
                      top: "12",
                      left: "10"
                    }}
                    cursor="pointer"
                    onClick={() => {
                        navigate(-1)
                    }}
                />
                <h3>회원가입</h3>
            </HeadLine>

            <InputBox>
                <p>아이디 입력</p>
                <input
                    value={username}
                    placeholder='아이디를 입력하세요'
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </InputBox>

            <InputBox>
                <p>닉네임 입력</p>
                <input
                    value={nickname}
                    placeholder='닉네임을 입력하세요'
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setNickname(e.target.value)}
                />
            </InputBox>

            <PasswordBox>
                <p>비밀번호 입력</p>
                <input
                    value={pw}
                    placeholder='비밀번호를 입력하세요'
                    type={hidePassword ? 'password' : 'text'}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setPw(e.target.value)}
                />
                    {hidePassword && <img src={eyeOff} onClick={toggleHidePassword}/>}
                    {!hidePassword && <img src={eyeOn} onClick={toggleHidePassword}/>}
            </PasswordBox>

            <PwCheckBox>
                <input
                    value={pwCheck}
                    placeholder='비밀번호를 다시 한번 입력하세요'
                    type={hidePasswordCheck ? 'password' : 'text'}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setPwCheck(e.target.value)}
                />
                    {hidePasswordCheck && <img src={eyeOff} onClick={toggleHidePasswordCheck}/>}
                    {!hidePasswordCheck && <img src={eyeOn} onClick={toggleHidePasswordCheck}/>}
            </PwCheckBox>

            <SignUpBox>
                <button
                    style={{opacity: !username || !nickname || !pw || !pwCheck ? 0.3 : 1}}
                    onClick={handleSignUp}
                >회원가입
                </button>
            </SignUpBox>
        </>
    )
}

export default SignUp

const HeadLine = styled.div`
  position: relative;
  width: 100%;
  text-align: center;

  h3 {
    font-size: 24px;
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 50px;
  }
`

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 10px auto;
  position: relative;
  
  p {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 10px;
  }

  input {
    background-color: #eee;
    padding: 12px;
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 10px;
    margin-bottom: 30px;

    &:focus {
      outline: none;
    }
  }
`

const PasswordBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 10px auto;
  position: relative;

  p {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 10px;
  }

  input {
    background-color: #eee;
    padding: 12px;
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 10px;
    margin-bottom: 10px;

    &:focus {
      outline: none;
    }
  }

  img {
    position: absolute;
    right: 10px;
    top: 40px;
  }
`

const PwCheckBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 10px auto;
  position: relative;

  input {
    background-color: #eee;
    padding: 12px;
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 10px;
    margin-bottom: 10px;

    &:focus {
      outline: none;
    }
  }

  img {
    position: absolute;
    right: 10px;
    top: 13px;
  }
`

const SignUpBox = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px;
  margin: 0 auto;

  button {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 10px;
    color: black;
    background-color: #A1ED00;
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
  }
`