import React from 'react';
import styled from "styled-components";
import Logo from '../img/Logo.svg'
import Event from '../img/icon/event.svg'
import Gift from '../img/icon/gift.svg'
import First from '../img/1st.png'
import Second from '../img/2nd.png'
import Third from '../img/3rd.png'
import theme from "../styles/theme";
import {Link} from "react-router-dom";
import {KAKAO_AUTH_URL} from "../service/OAuth";
import KakaoSymbol from "../img/icon/KakaoSymbol.png";

const BackGround = (props) => {

    const research = 'https://docs.google.com/forms/d/e/1FAIpQLSdWEil2no-Yr36o5IdMrNLpLfgvt1DPUyUC3cPyQ72GFoBSPQ/viewform'

    return (
        <Container>
            <HeadContainer>
                <img alt='logo' src={Logo}/>
                <p>온세상을 잇다, 온잇</p>
            </HeadContainer>

            <Text>
                <p>만들고, 공유하고, 확인하는 약속 공유 플랫폼 온잇에서</p>
                <p>모든 약속을 관리하고 세상과 나를 이어보세요.</p>
            </Text>

            <EventContainer>
                <img alt='event' src={Event}/>
                <p>온잇에서 약속 계획 만들고, 친구들에게 공유하고 선물 받자!</p>
                <img alt='gift' src={Gift}/>
            </EventContainer>

            <EventDateContainer>
                <h5>참여기간</h5>
                <p> 2022.05.26(목) ~ 06.02(목)</p>
            </EventDateContainer>

            <EventJoinContainer>
                <h5>참여방법</h5>
                <div className='step'>
                    <div className='step-by-step'>
                        <p>Step 1.</p>
                        <p>내용을 입력하세요~</p>
                    </div>
                    <div className='step-by-step'>
                        <p>Step 2.</p>
                        <p>내용을 입력하세요~</p>
                    </div>
                    <div className='step-by-step'>
                        <p>Step 3.</p>
                        <a href={research}>
                            <button>여기</button>
                        </a>
                        <p>여기 버튼을 눌러서 참여하면 끝입니다.</p>
                    </div>
                </div>
            </EventJoinContainer>

            <GiftContainer>
                <h5>상품</h5>
                <img alt='first' src={First}/>
                <img alt='second' src={Second}/>
                <img alt='third' src={Third}/>
            </GiftContainer>
        </Container>
    );
}

export default BackGround;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 50px 0 0 50px;

  img {
    width: 50%;
    max-width: 200px;
    margin-right: 20px;
  }

  p {
    font-weight: bold;
    display: flex;
    align-items: end;
    justify-content: center;
  }
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 25px 50px;

  p {
    font-weight: bold;
    padding: 5px;
  }
`

const EventContainer = styled.div`
  display: flex;
  margin-left: 50px;
  margin-bottom: 25px;

  p {
    font-weight: bold;
    font-size: 23px;
    display: flex;
    align-items: end;
    margin-left: 30px;
    padding-bottom: 6px;
  }

  img:last-of-type {
    margin-left: 30px;
  }
`

const EventDateContainer = styled.div`
  display: flex;
  margin-bottom: 25px;

  h5 {
    width: 15%;
    margin-left: 50px;
    font-weight: bold;
    font-size: 30px;
  }

  p {
    display: flex;
    align-items: end;
    font-weight: bold;
    margin-left: 10px;
  }
`

const EventJoinContainer = styled.div`
  display: flex;
  margin-bottom: 25px;

  .step {
    width: 80%;
    margin-left: 10px;
  }

  .step-by-step {
    display: flex;
    align-items: center;
    background-color: ${theme.color.white};
    width: 80%;
    height: 50px;
    margin-bottom: 10px;
    border-radius: 10px;
  }

  a {
    margin-left: 30px;
    width: 15%;
    border-radius: 10%;
  }

  button {
    width: 100%;
    height: 30px;
    background-color: ${theme.color.green};
    border: none;
    border-radius: 10%;
    font-weight: bold;
  }

  h5 {
    width: 15%;
    margin-left: 50px;
    font-weight: bold;
    font-size: 30px;
  }

  p:first-of-type {
    width: 10%;
  }

  p {
    display: flex;
    align-items: end;
    margin-left: 30px;
    font-weight: bold;
  }
`

const GiftContainer = styled.div`
  display: flex;

  h5 {
    width: 15%;
    margin-left: 50px;
    font-weight: bold;
    font-size: 30px;
  }

  img {
    width: 100%;
    max-width: 200px;
    margin-left: 5px;
  }
  
  img:first-of-type {
    width: 100%;
    max-width: 200px;
    margin-left: 0.1px;
  }
`

