import React, {useState} from "react";
import {login, setLoading, setUserName} from "../redux/modules/user";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user.user)
    const loading = useSelector((state) => state.user.loading)

    const [id, setId] = useState('')
    const [pw , setPw] = useState('')

    const Login = () => {
        if (id === '' || pw === '') {
            window.alert('아이디, 비밀번호 모두 입력해주세요.');
        } else {
            const loginData = {
                id: id,
                password: pw,
            };
            dispatch(login(loginData));
        }
    };

    //엔터 입력시
    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            Login();
        }
    };

    const setUser = (userName) => {
        dispatch(setUserName(userName))
    }

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
                    placeholder='아이디를 입력하세요'
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setId(e.target.value)}
                />
            </div>

            <div>
                <p>패스워드</p>
                <input
                    placeholder='패스워드를 입력하세요'
                    type='password'
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setPw(e.target.value)}
                />
            </div>

            <div>
                <button
                    onClick={Login}
                >로그인</button>
            </div>

            <div>
                <button>카카오톡 로그인</button>
            </div>

            <div>
                <button
                    onClick={() =>{
                        navigate('/signup')
                    }}
                >회원가입</button>
           </div>
        </div>
    )
}

export default Login