import React, {useEffect, useRef, useState} from 'react';
import Logo from '../img/Logo.svg'
import styled from "styled-components";
import ChangeWording from "../shared/utils/ChangeWording";
import theme from "../styles/theme";

const LaptopBackground = () => {
    const intervalRef = useRef(null)
    const changeWordingRef = useRef(null)
    const [ct, setCt] = useState(null)

    useEffect(() => {
        if (changeWordingRef.current) {
            const _ct = new ChangeWording(changeWordingRef.current)
            setCt(_ct);
        }
        return () => {
            setCt(null)
        }
    }, [])

    useEffect(() => {
        if (ct) {
            const texts = ['즐거움', '약속', '위치', '사람'];
            let count = 0;
            intervalRef.current = setInterval(() => {
                if (ct) {
                    ct.changeText(texts[++count % texts.length]);
                }
            }, 2000);
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [ct])

    return (
        <Container>
            <TitleContainer>
                <span>온 세상 [</span>
                <div ref={changeWordingRef} className="changing-wording">
                    <h1>약속</h1>
                </div>
                <span>] 을 잇다</span>
            </TitleContainer>

            <TextContainer>
                <p>친구 위치 공유 플랫폼</p>
                <img alt='logo' src={Logo}/>
            </TextContainer>
        </Container>
    );
}

export default LaptopBackground;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-right: 200px;
  padding-bottom: 200px;
  padding-left: 100px;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  width: 80%;

  span:first-of-type {
    font-weight: normal;
    margin-right: 10px;
  }

  span {
    line-height: 45px;
    font-size: 45px;
    font-weight: normal;
    margin-right: 10px;
  }

  span:last-of-type {
    font-weight: normal;
  }

  @keyframes letter-in {
    0% {
      top: 1.2em;
    }
    100% {
      top: 0;
    }
  }
  @keyframes letter-out {
    0% {
      top: 0;
    }
    100% {
      top: -1.2em;
    }
  }

  .changing-wording {
    font-size: 45px;
    height: 45px;
    width: 150px;
    position: relative;
    overflow-y: hidden;
    transform: translate3d(0, 0, 0);

    h1 {
      font-size: 1em;
      position: absolute;
      text-align: center;
      font-weight: bold;
      width: 150px;
      left: 0;
      top: 0;
      margin: 0;

      .letter {
        position: relative;
        top: 1.2em;

        &.in {
          animation-name: letter-in;
          animation-duration: 0.3s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }

        &.out {
          top: 0em;
          animation-name: letter-out;
          animation-duration: 0.3s;
          animation-timing-function: ease-in;
          animation-fill-mode: forwards;
        }
      }
    }
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: center;

  p {
    font-size: 24px;
    margin-right: 30px;
  }

  img {
    width: 30%;
  }
`