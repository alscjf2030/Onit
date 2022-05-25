import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {actionCreators as kakaoActions} from "../redux/modules/user";

const KakaoHandler = (props) => {

    const dispatch = useDispatch();

    let code = new URL(window.location.href).searchParams.get("code");

    useEffect(() => {
        const kakaoHandle = async () => {
            await dispatch(kakaoActions.kakaoLogin(code));
        }
        kakaoHandle()
    }, []);

    return (
        <>
        </>
    );
};

export default KakaoHandler