import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {OnBoard} from '../img';
import Logo from '../img/Logo.svg'
import KakaoButton from "../components/KakaoButton";

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <TitleBox>
                <h3>만들고, 공유하고, 확인하는</h3>
                <h3>모임 약속 공유 플랫폼</h3>
            </TitleBox>
            <img alt='logo' className='logo' src={Logo}/>
            <OnBoardingBox>
                <img alt='cover' src={OnBoard}/>
            </OnBoardingBox>
            <LoginDiv>
                <KakaoButton/>
                <LoginBox>
                    <button
                        onClick={() => {
                            navigate('/login')
                        }}
                    >아이디로 로그인하기
                    </button>
                </LoginBox>
                <SignupBox>
                    <span>아직 회원이 아니신가요?</span>
                    <p onClick={() => {
                        navigate('/signup')
                    }}>회원가입하기</p>
                </SignupBox>
            </LoginDiv>
        </Container>
    );
};


export default Home;

const Container = styled.div`
  height: 100%;

  .logo {
    width: 30%;
    margin-left: 35px;
    padding-bottom: 20px;
  }
`

const TitleBox = styled.div`
  width: 100%;
  padding: 100px 0 20px 35px;

  h3 {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 10px;
  }
`

const OnBoardingBox = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: 100%;
    margin: 40px 0px;
    object-fit: cover;
  }
`

const LoginDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-bottom: 15px;

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

const SignupBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-top: 16px;
  padding-bottom: 16px;

  span {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    color: black;
  }

  p {
    display: flex;
    justify-content: center;
    color: black;
    cursor: pointer;
    font-weight: bold;
    text-decoration: underline
  }
`