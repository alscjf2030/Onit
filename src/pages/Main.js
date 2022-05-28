import {useSelector, useDispatch} from "react-redux";
import { updateUser } from "../redux/modules/user";
import styled from "styled-components";
import React, {useEffect} from "react";
import dayjs from "dayjs";
import 'dayjs/locale/ko'

//components
import FCMtoken from "../components/FCMtoken";
import PlanTab from "../components/PlanTab";
import SideMenu from "../components/SideMenu";
import theme from "../styles/theme";

dayjs.locale('ko')

const Main = (props) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.user_info)
    const nowDate = dayjs()
        .format('YYYY년MM월DD일 dddd')

    useEffect(() => {
        dispatch(updateUser())
    }, [])

    return (
        <Container>
            <FCMtoken/>
            <SideMenu/>
            <UserInfo>
                <div className='member-profile'
                     style={{
                         backgroundImage: `url(${userData?.profileImg})`,
                         backgroundSize: 'cover',
                     }}/>
                <p>{userData?.nickname ? userData.nickname : '손'} 님 <br/>{nowDate} 입니다.</p>
            </UserInfo>
            <Tab>
                <PlanTab/>
            </Tab>
        </Container>
    )
}

export default Main

const Tab = styled.div`
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.color.gray7};
  position: relative;

  .logo {
    position: absolute;
    left: 24px;
    top: 20px;
  }
`

const UserInfo = styled.div`
  background-color: transparent;
  width: 100%;
  padding: 10px 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;

  p: first-of-type {
    font-size: 18px;
    margin: auto;
    justify-content: center;
    align-items: center;
  }.member-profile {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 1px solid #fff;
  }
`

