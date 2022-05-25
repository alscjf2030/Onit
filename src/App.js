import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import styled from "styled-components";
import MainContents from "./components/MainContents";
import useIsMobile from "./hooks/useIsMobile";


function App() {
    const isMobile = useIsMobile()
    return (
        <Container>
            {isMobile ? (
                <MainContents/>
            ) : (
                <LaptopContainer>
                    <LeftWrap>
                        <div>배경 자리</div>
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
`

const LaptopContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  //  여기에 전체 배경
`

const LeftWrap = styled.div`
  flex: 1;
  max-width: 950px;
  //  여기가 배경 자리
`

const RightWrap = styled.div`
  padding: 30px 70px;
  max-width: 590px;
`

const PhoneFrame = styled.div`
  width: 375px;
  height: 812px;
`