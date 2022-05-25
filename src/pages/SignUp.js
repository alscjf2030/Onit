import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setError, setLoading, signUp} from "../redux/modules/user";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {ReactComponent as LeftArrow} from '../img/icon/arrowl.svg';
import Swal from "sweetalert2";

import eyeOn from '../img/icon/eyeOn.svg'
import eyeOff from '../img/icon/eyeOff.svg'
import theme from "../styles/theme";

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
    const error = useSelector((state) => state.user.error)

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
            dispatch(setError('비밀번호가 일치하지 않습니다!'))
            return
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

    return (
        <Container>
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
                {error === '이미 사용중인 아이디 입니다!' ?
                    <input
                        style={{
                            border: `2px solid ${theme.color.red1}`,
                            backgroundColor: `${theme.color.red2}`
                        }}
                        value={username}
                        placeholder='아이디를 입력하세요'
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setUsername(e.target.value)}
                    /> :
                    <input
                        value={username}
                        placeholder='아이디를 입력하세요'
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                }
                {error === '이미 사용중인 아이디 입니다!' && <ErrorBox>{error}</ErrorBox>}
            </InputBox>

            <InputBox>
                <p>닉네임 입력</p>
                {error === '이미 사용중인 닉네임 입니다!' ?
                    <input
                        style={{
                            border: `2px solid ${theme.color.red1}`,
                            backgroundColor: `${theme.color.red2}`
                        }}
                        value={nickname}
                        placeholder='닉네임을 입력하세요'
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setNickname(e.target.value)}
                    /> :
                    <input
                        value={nickname}
                        placeholder='닉네임을 입력하세요'
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                }
                {error === '이미 사용중인 닉네임 입니다!' && <ErrorBox>{error}</ErrorBox>}
            </InputBox>

            <PasswordBox>
                <p>비밀번호 입력</p>
                {error === '비밀번호가 일치하지 않습니다!' ?
                    <input
                        style={{
                            border: `2px solid ${theme.color.red1}`,
                            backgroundColor: `${theme.color.red2}`
                        }}
                        value={pw}
                        placeholder='비밀번호를 입력하세요'
                        type={hidePassword ? 'password' : 'text'}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setPw(e.target.value)}
                    /> :
                    <input
                        value={pw}
                        placeholder='비밀번호를 입력하세요'
                        type={hidePassword ? 'password' : 'text'}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setPw(e.target.value)}
                    />
                }
                {hidePassword && <img src={eyeOff} onClick={toggleHidePassword}/>}
                {!hidePassword && <img src={eyeOn} onClick={toggleHidePassword}/>}
            </PasswordBox>

            <PwCheckBox>
                {error === '비밀번호가 일치하지 않습니다!' ?
                    <input
                        style={{
                            border: `2px solid ${theme.color.red1}`,
                            backgroundColor: `${theme.color.red2}`
                        }}
                        value={pwCheck}
                        placeholder='비밀번호를 다시 한번 입력하세요'
                        type={hidePasswordCheck ? 'password' : 'text'}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setPwCheck(e.target.value)}
                    /> :
                    <input
                        value={pwCheck}
                        placeholder='비밀번호를 다시 한번 입력하세요'
                        type={hidePasswordCheck ? 'password' : 'text'}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setPwCheck(e.target.value)}
                    />
                }
                {hidePasswordCheck && <img src={eyeOff} onClick={toggleHidePasswordCheck}/>}
                {!hidePasswordCheck && <img src={eyeOn} onClick={toggleHidePasswordCheck}/>}
                {error === '비밀번호가 일치하지 않습니다!' && <ErrorBox>{error}</ErrorBox>}
            </PwCheckBox>

            <SignUpBox>
                <button
                    style={{opacity: !username || !nickname || !pw || !pwCheck ? 0.3 : 1}}
                    onClick={handleSignUp}
                >회원가입
                </button>
            </SignUpBox>
        </Container>
    )
}

export default SignUp

const Container = styled.div`
  width: 100%;
  height: 100%;
`

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
  margin: 10px auto 30px;
  position: relative;

  p {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 10px;
  }

  input {
    background-color: ${theme.color.gray5};
    padding: 12px;
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 10px;

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
    background-color: ${theme.color.gray5};
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

const ErrorBox = styled.div`
  font-size: 14px;
  color: ${theme.color.orange};
  margin-top: 8px;
  margin-left: 2px;
`