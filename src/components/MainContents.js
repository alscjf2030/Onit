import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import CompleteSignup from "../pages/CompleteSignup";
import Main from "../pages/Main";
import AddPlans from "../pages/AddPlans";
import KakaoMap from "../shared/KakaoMap";
import Detail from "../pages/Detail";
import PlanSetName from "../pages/PlanSetName";
import PastPlan from "../pages/PastPlan";
import EditPlan from "../pages/EditPlan";
import KakaoHandler from "../service/KakaoHandler";
import NotFound from "../pages/NotFound";
import styled from "styled-components";

function MainContents(props) {
    return (
        <MobileContainer>
            <div id="mobile-portal"/>
            <MobileScrollBar className='scroll-bar'>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path="/login" element={<Login/>}>
                        <Route path=":join" element={<Login/>}/>
                    </Route>
                    <Route path="/signup" element={<SignUp/>}>
                        <Route path=":join" element={<SignUp/>}/>
                    </Route>
                    <Route path="/complete" element={<CompleteSignup/>}>
                        <Route path=':join' element={<CompleteSignup/>}/>
                    </Route>
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
            </MobileScrollBar>
        </MobileContainer>
    );
}

const MobileContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const MobileScrollBar = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`

export default MainContents;