import React, {useEffect} from 'react';

//redux
import { setFCMToken } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";

//FCM
import { deleteToken, getToken} from 'firebase/messaging'
import { messaging } from '../firebase';

const FCMtoken = (props) => {
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.user_info?.nickname)

    // Notification API 쓰면 모바일이 하얀 화면
    // Notification.permission

    useEffect(() => {
        if (username) {
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
                const data = {
                    token: localStorage.getItem('FCMtoken')
                };
                dispatch(setFCMToken(data));
            })}
        }
    }, [username])

    return(
        <>
        </>
    )
}

export default FCMtoken;