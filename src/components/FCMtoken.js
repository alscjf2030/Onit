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
    //이게 있으면 모바일이 하얀 화면
    // const browsernoti = Notification.permission === 'granted' ? true : false;
    useEffect(() => {
        if (username) {
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
            })
        }
    }, [username])

    return(
        <>
        </>
    )
}

export default FCMtoken;