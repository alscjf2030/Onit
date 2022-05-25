import React, {useEffect} from 'react';

//redux
import { setFCMToken } from "../redux/modules/user";
import { useDispatch } from "react-redux";

const FCMtoken = (props) => {
    const dispatch = useDispatch();
    // Notification API 쓰면 모바일이 하얀 화면
    // Notification.permission

    useEffect(() => {
            if(localStorage.getItem('FCMtoken')) {
                console.log('토큰 보냄!')
                const data = {
                    token: localStorage.getItem('FCMtoken')
                };
                dispatch(setFCMToken(data));
            }
   }, [])

    return(
        <>
        </>
    )
}

export default FCMtoken;