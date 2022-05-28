import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setError, signUp, signUp2} from "../redux/modules/user";
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import {ReactComponent as LeftArrow} from '../img/icon/arrowl.svg';
import Swal from "sweetalert2";

import eyeOn from '../img/icon/eyeOn.svg'
import eyeOff from '../img/icon/eyeOff.svg'
import theme from '../styles/theme';
import Agreement from '../components/Agreement'
import { Grid } from "../elements";

const SignUp = (props) => {
    const {join} = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [checked, setChecked] = useState(false);
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
        if (!checked) {
            Swal.fire({
                // title: 'Error!',
                text: '약관에 모두 동의해 주세요!',
                icon: 'error'
            })
            return
        }
        if (pw !== pwCheck) {
            dispatch(setError('비밀번호가 일치하지 않습니다!'))
        } else {
            const data = {
                username,
                nickname,
                password: pw,
            }
            if(join){
                dispatch(signUp2({data, join, navigate}))
            } else {
                dispatch(signUp({data, navigate}));
            }
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
                            border: `1px solid ${theme.color.red1}`,
                            backgroundColor: `${theme.color.red2}`
                        }}
                        value={username}
                        placeholder='아이디는 영어와 숫자 3~9자리 입니다.'
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setUsername(e.target.value)}
                    /> :
                    error === '아이디는 영어 or 숫자로 3자리 이상 ~10자리 이하로 입력하셔야 합니다!' ?
                        <input
                            style={{
                                border: `1px solid ${theme.color.red1}`,
                                backgroundColor: `${theme.color.red2}`
                            }}
                            value={username}
                            placeholder='아이디는 영어와 숫자 3~9자리 입니다.'
                            onKeyPress={handleKeyPress}
                            onChange={(e) => setUsername(e.target.value)}
                        /> :
                    <input
                        value={username}
                        placeholder='아이디는 영어와 숫자 3~9자리 입니다.'
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                }
                {error === '이미 사용중인 아이디 입니다!' ? <ErrorBox>{error}</ErrorBox> :
                    error === '아이디는 영어 or 숫자로 3자리 이상 ~10자리 이하로 입력하셔야 합니다!' ?
                        <ErrorBox>'아이디는 영어,숫자 3~10자리 입니다.'</ErrorBox> : null
                }
            </InputBox>

            <InputBox>
                <p>닉네임 입력</p>
                {error === '이미 사용중인 닉네임 입니다!' ?
                    <input
                        style={{
                            border: `1px solid ${theme.color.red1}`,
                            backgroundColor: `${theme.color.red2}`
                        }}
                        value={nickname}
                        placeholder='닉네임은 2~8자리 입니다.'
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setNickname(e.target.value)}
                    /> :
                    error === '닉네임은 한글 or 영어 or 숫자로 2자리 이상 ~8자리 이하로 입력하셔야 합니다!' ?
                        <input
                            style={{
                                border: `1px solid ${theme.color.red1}`,
                                backgroundColor: `${theme.color.red2}`
                            }}
                            value={nickname}
                            placeholder='닉네임은 2~8자리 입니다.'
                            onKeyPress={handleKeyPress}
                            onChange={(e) => setNickname(e.target.value)}
                        /> :
                    <input
                        value={nickname}
                        placeholder='닉네임은 2~8자리 입니다.'
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                }
                {error === '이미 사용중인 닉네임 입니다!' ? <ErrorBox>{error}</ErrorBox> :
                    error === '닉네임은 한글 or 영어 or 숫자로 2자리 이상 ~8자리 이하로 입력하셔야 합니다!' ?
                    <ErrorBox>'닉네임은 한글,영어,숫자 2~8자리 입니다.'</ErrorBox> : null
                }
            </InputBox>

            <PasswordBox>
                <p>비밀번호 입력</p>
                {error === '비밀번호가 일치하지 않습니다!' ?
                    <input
                        style={{
                            border: `1px solid ${theme.color.red1}`,
                            backgroundColor: `${theme.color.red2}`
                        }}
                        value={pw}
                        placeholder='비밀번호는 영어와 숫자로 4~12자리 입니다.'
                        type={hidePassword ? 'password' : 'text'}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setPw(e.target.value)}
                    /> :
                    error === '비밀번호는 영어 or 숫자로 4자리 이상 ~12자리 이하로 입력하셔야 합니다!' ?
                        <input
                            style={{
                                border: `1px solid ${theme.color.red1}`,
                                backgroundColor: `${theme.color.red2}`
                            }}
                            value={pw}
                            placeholder='비밀번호는 영어와 숫자로 4~12자리 입니다.'
                            type={hidePassword ? 'password' : 'text'}
                            onKeyPress={handleKeyPress}
                            onChange={(e) => setPw(e.target.value)}
                        /> :
                    <input
                        value={pw}
                        placeholder='비밀번호는 영어와 숫자로 4~12자리 입니다.'
                        type={hidePassword ? 'password' : 'text'}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setPw(e.target.value)}
                    />
                }
                {hidePassword && <img alt='eyeOff' src={eyeOff} onClick={toggleHidePassword}/>}
                {!hidePassword && <img alt='eyeOn' src={eyeOn} onClick={toggleHidePassword}/>}
            </PasswordBox>

            <PwCheckBox>
                {error === '비밀번호가 일치하지 않습니다!' ?
                    <input
                        style={{
                            border: `1px solid ${theme.color.red1}`,
                            backgroundColor: `${theme.color.red2}`
                        }}
                        value={pwCheck}
                        placeholder='비밀번호는 영어와 숫자로 4~12자리 입니다.'
                        type={hidePasswordCheck ? 'password' : 'text'}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setPwCheck(e.target.value)}
                    /> :
                    error === '비밀번호는 영어 or 숫자로 4자리 이상 ~12자리 이하로 입력하셔야 합니다!' ?
                        <input
                            style={{
                                border: `1px solid ${theme.color.red1}`,
                                backgroundColor: `${theme.color.red2}`
                            }}
                            value={pwCheck}
                            placeholder='비밀번호는 영어와 숫자로 4~12자리 입니다.'
                            type={hidePassword ? 'password' : 'text'}
                            onKeyPress={handleKeyPress}
                            onChange={(e) => setPwCheck(e.target.value)}
                        /> :
                    <input
                        value={pwCheck}
                        placeholder='비밀번호는 영어와 숫자로 4~12자리 입니다.'
                        type={hidePasswordCheck ? 'password' : 'text'}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setPwCheck(e.target.value)}
                    />
                }
                {hidePasswordCheck && <img alt='eyeOff' src={eyeOff} onClick={toggleHidePasswordCheck}/>}
                {!hidePasswordCheck && <img alt='eyeOn' src={eyeOn} onClick={toggleHidePasswordCheck}/>}
                {error === '비밀번호가 일치하지 않습니다!' ? <ErrorBox>{error}</ErrorBox> :
                    error === '비밀번호는 영어 or 숫자로 4자리 이상 ~12자리 이하로 입력하셔야 합니다!' ?
                        <ErrorBox>'비밀번호는 영어, 숫자 4~12자리 입니다.'</ErrorBox> : null
                }
            </PwCheckBox>
            <Grid padding="0px 1rem 1rem 1rem">
                <Agreement checked={checked} setChecked={setChecked}/>
            </Grid>
            <SignUpBox>
                <button
                    style={{opacity: !username || !nickname || !pw || !pwCheck || !checked ? 0.3 : 1 }}
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
  background-color: ${theme.color.gray7};
`

const HeadLine = styled.div`
  position: relative;
  width: 100%;
  text-align: center;

  h3 {
    font-size: 24px;
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 25px;
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
    background-color: ${theme.color.white};
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
    background-color: ${theme.color.white};
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
    background-color: ${theme.color.white};
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

const SuccessBox = styled.div`
  font-size: 14px;
  color: ${theme.color.green3};
  margin-top: 8px;
  margin-left: 2px;
`