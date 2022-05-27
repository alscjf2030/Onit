import React, {useEffect} from "react";
import GlobalStyle from "./styles/GlobalStyle";
import styled from "styled-components";
import MainContents from "./components/MainContents";
import useIsMobile from "./hooks/useIsMobile";

import {messaging} from "./firebase";
import {getToken} from 'firebase/messaging'
import theme from "./styles/theme";
import EventBackGround from "./components/EventBackGround";
import LaptopBackground from "./components/LaptopBackground";


function App() {

    useEffect(() => {
        if (localStorage.getItem('FCMtoken')) {
            console.log("이미 토큰이 발급됨!")
            return
        } else {
            console.log("토큰 발급!")
            getToken(messaging, {
                vapidKey: "BLg2NeG06gdfa1DbdDn1E6VFSD8a82zuaxgPXS5drdMaqUSf_lY421iglOkbev53HaDsl2jkw5vxgM" +
                    "aA4b6wfug"
            }).then(token => {
                console.log(token);
                localStorage.setItem('FCMtoken', token);
            })
        }
    }, [])

    const isMobile = useIsMobile()

    return (
        <Container>
            {isMobile ? (
                <MainContents/>
            ) : (
                <LaptopContainer>
                    <LeftWrap>
                        <LaptopBackground/>
                        {/*<EventBackGround/>*/}
                    </LeftWrap>
                    <RightWrap>
                        <PhoneFrame>
                            <MainContents/>
                        </PhoneFrame>
                    </RightWrap>
                </LaptopContainer>
            )}
            <GlobalStyle/>
        </Container>
    );
}

export default App;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: ${theme.color.gray5};
`

const LaptopContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const LeftWrap = styled.div`
  flex: 1.5;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const RightWrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 150px;
  background-color: ${theme.color.gray5};
`

const PhoneFrame = styled.div`
  width: 375px;
  height: 812px;
`