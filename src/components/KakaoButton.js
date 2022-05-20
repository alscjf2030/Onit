import React from 'react';
import styled from "styled-components";
import {KAKAO_AUTH_URL} from "../service/OAuth";
import KakaoSymbol from "../img/icon/KakaoSymbol.png";

const KakaoButton = (props) => {

    return (
        <Container>
            <KakaoBox>
                <a href={KAKAO_AUTH_URL}>
                    <img src={KakaoSymbol}/>
                    카카오로 시작하기
                </a>
            </KakaoBox>
        </Container>
    );
}

export default KakaoButton;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 0 auto 30px auto;
`

const KakaoBox = styled.div`
  position: relative;
  background-color: #FEE500;
  width: 100%;
  margin-bottom: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  a {
    width: 100%;
    height: 40px;
    color: black;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration-line: none;
    font-weight: bold;
  }

  img {
    position: absolute;
    left: 10px;
    width: 24px;
    height: 24px;
  }
`
