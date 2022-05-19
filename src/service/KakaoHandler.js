import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {actionCreators as kakaoActions} from "../redux/modules/user";

import Spinner from "../elements/Spinner";
import {useNavigate} from "react-router-dom";

const KakaoHandler = (props) => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    let code = new URL(window.location.href).searchParams.get("code");

    useEffect(() => {
        const kakaoHandle = async () => {
            await dispatch(kakaoActions.kakaoLogin({code, navigate}));
        }
        kakaoHandle()
    }, []);

    return (
        <div>
            <Spinner />
        </div>
    );
};

export default KakaoHandler