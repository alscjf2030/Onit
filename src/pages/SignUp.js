import React, {useEffect, useState} from "react";
import {getApi, postApi} from "../shared/api/client";
import {useDispatch, useSelector} from "react-redux";
import {setLoading, setUserName, signUp} from "../redux/modules/user";
import {useNavigate} from "react-router-dom";

const SignUp = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [id , setId] = useState('')
    const [nickname , setNickname] = useState('')
    const [pw , setPw] = useState('')
    const [pwCheck , setPwCheck] = useState('')
    const loading = useSelector((state) => state.user.loading)

    const handleSignUp = () => {
        if (!id || !nickname || !pw || !pwCheck) {
            return window.alert('내용을 모두 입력해주세요');
        }
        if (pw != pwCheck) {
            return window.alert('비밀번호가 일치하지 않습니다');
        } else {
            const data = {
                id,
                nickname,
                password: pw,
            }
            dispatch(signUp(data));
        }
    };

    //엔터 입력시
    const handleKeyPress = e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSignUp();
        }
    };

    if ( loading === 'pending' ) {
        return 'loading...'
    }
    if ( loading === 'failed' ) {
        setTimeout(() => {
            dispatch(setLoading('idle'))
        }, 1000)
        return 'failed...'
    }


    return (
        <div>
            <div>
                <h1>On it</h1>
            </div>

            <div>
                <p>아이디</p>
                <input
                    value={id}
                    placeholder='아이디를 입력하세요'
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setId(e.target.value)}
                />
            </div>

            <div>
                <p>닉네임</p>
                <input
                    value={nickname}
                    placeholder='닉네임을 입력하세요'
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setNickname(e.target.value)}
                />
            </div>

            <div>
                <p>패스워드</p>
                <input
                    value={pw}
                    placeholder='패스워드를 입력하세요'
                    type='password'
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setPw(e.target.value)}
                />
            </div>

            <div>
                <p>패스워드 확인</p>
                <input
                    value={pwCheck}
                    placeholder='패스워드를 다시 한번 입력하세요'
                    type='password'
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setPwCheck(e.target.value)}
                />
            </div>

            <div>
                <button
                    onClick={handleSignUp}
                >회원가입</button>
            </div>
        </div>
    )
}

export default SignUp


// useEffect(() => {
//     const getUser = async () => {
//         try {
//             const res = await getApi('/user/me')
//             if ( res.status === 200 ) {
//                 dispatch(setUserName(res.data.userName))
//             }
//         } catch (e) {
//             //..
//         }
//     }
//     getUser()
// }, [])
//
// const handleSignUp = async () => {
//     try {
//         const res = await postApi('/user/signup', {id, nickname, pw})
//         if ( res.status === 200 ) {
//             dispatch(setUserName(res.data.userName))
//         }
//     } catch (e) {
//         //..
//     }
// }