import React, {useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";

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
// import PastPlan from "./pages/PastPlan";
// import EditPlan from "./pages/EditPlan";
// import NotFound from "./pages/NotFound";


function App() {
  return (
   <>
   <GlobalStyle/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/login" element={<Login/>}>
          <Route path=":join" element={<Login/>} />
        </Route>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/complete" element={<CompleteSignup/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/add" element={<AddPlans/>}/>
        <Route path="/test" element={<KakaoMap/>}/>
        <Route path="/detail/:planUrl" element={<Detail/>}/>
        <Route path="/details/:url" element={<PlanSetName/>} />
        {/*
        <Route path="/past" element={<PastPlan/>}/>
        <Route path="/edit/:planUrl" element={<EditPlan/>}/>
        <Route path="/users/kakao/callback" element={<OAuthHandler/>}/>
        <Route path="*" element={<NotFound/>}/> */}
      </Routes>
   </>
  );
}

export default App;
