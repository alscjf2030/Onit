import React from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import NotFoundLogo from '../img/NotFoundLogo.svg'

const NotFound = (props) => {

    const navigate = useNavigate()

    return (
        <Container>
            <ImgBox>
                <img src={NotFoundLogo}/>
            </ImgBox>
            <h2>빈 페이지를 발견하셨어요..!</h2>
            <p>페이지 주소를 잘못 입력하셨거나</p>
            <p>주소가 변경 혹은 삭제됐을 수 있어요.</p>
            <p>입력한 주소를 다시 확인해 주세요.</p>
            <ButtonBox>
                <button onClick={() => {navigate(-1)}}>이전으로</button>
                <button onClick={() => {navigate('/main')}}>메인으로</button>
            </ButtonBox>
        </Container>
    );
}

export default NotFound;

const Container = styled.div`
  min-height: 100vh;
  
  h2 {
    margin-top: 30px;
    margin-bottom: 30px;
    padding-left: 40px;
    font-size: 20px;
    color: #EB7567;
  }
  
  p {
    padding-left: 40px;
    padding-bottom: 5px;
  }
`

const ImgBox = styled.div`
  width: 100%;
  height: 50%;
  
  img {
    width: 70%;
    height: 70%;
    padding-left: 40px;
    padding-top: 150px;
  }
`

const ButtonBox = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  
  button {
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 16px;
    margin: 30px 8px;
    width: 35%;
    font-weight: bold;
  }
  
  button:last-of-type {
    background-color: #EB7567;
  }
`