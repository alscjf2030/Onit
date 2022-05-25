import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import styled from "styled-components";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CompleteSignup from "./pages/CompleteSignup";
import Main from "./pages/Main";
import AddPlans from "./pages/AddPlans";
import KakaoMap from "./shared/KakaoMap";
import Detail from "./pages/Detail";
import PlanSetName from "./pages/PlanSetName";
import PastPlan from "./pages/PastPlan";
import EditPlan from "./pages/EditPlan";
import NotFound from "./pages/NotFound";
import KakaoHandler from "./service/KakaoHandler";
import theme from "./styles/theme";

//FCM
import {getToken} from 'firebase/messaging'
import { messaging } from './firebase';



function App() {

    useEffect(() => {
        if(localStorage.getItem('FCMtoken')) {
            console.log("이미 토큰이 발급됨!")
            return
        }else{
        console.log("토큰 발급!")
        getToken(messaging, {
            vapidKey: "BLg2NeG06gdfa1DbdDn1E6VFSD8a82zuaxgPXS5drdMaqUSf_lY421iglOkbev53HaDsl2jkw5vxgM" +
                    "aA4b6wfug"
        }).then(token => {
            console.log(token);
            localStorage.setItem('FCMtoken', token);
        })}
}, [])

    return (
        <>
            <Size>
                <GlobalStyle/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path="/login" element={<Login/>}>
                        <Route path=":join" element={<Login/>}/>
                    </Route>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/complete" element={<CompleteSignup/>}/>
                    <Route path="/main" element={<Main/>}/>
                    <Route path="/add" element={<AddPlans/>}/>
                    <Route path="/test" element={<KakaoMap/>}/>
                    <Route path="/detail/:planUrl" element={<Detail/>}/>
                    <Route path="/details/:url" element={<PlanSetName/>}/>
                    <Route path="/past" element={<PastPlan/>}/>
                    <Route path="/edit/:planUrl" element={<EditPlan/>}/>
                    <Route path="/oauth/callback/kakao" element={<KakaoHandler/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Size>
        </>
    );
}

export default App;

const Size = styled.div`
  width: 100vw;
  height: 100%;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  position: fixed;
  @media ${theme.device.mobile} {
    transform: translate(50%, -50%);
    width: 20rem;
    height: 812px;
    min-width: 360px;
    //max-width: 768px;
    min-height: 680px;
    //max-height: 812px;
  }
  @media ${theme.device.laptop} {
    transform: translate(50%, -50%);
    width: 20rem;
    height: 847px;
    min-width: 375px;
    //max-width: 768px;
    min-height: 847px;
    //max-height: 847px;
  }
`;