import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {getApi, getApi2, postApi, putApi} from "../../shared/api/client";
import history from "../../index"
import axios from 'axios';
import Swal from "sweetalert2";

const initialState = {
    loading: 'idle',
    is_login: false,
    user_info: null,
    error: null
}

export const signUp = createAsyncThunk(
    'user/signup',
    async ({data, navigate}, {rejectWithValue}) => {
        try {
            const res = await postApi('/user/signup', data)
            console.log(res.data)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '회원가입 성공',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/complete')
            return {
                data: res.data,
                status: res.status
            }
        } catch (err) {
            console.log(err.response.data)
            // Swal.fire({
            //     text: err.response.data.msg,
            //     icon: 'error'
            // })
            return rejectWithValue(err.response.data)
        }
    }
)


export const login = createAsyncThunk(
    'user/login',
    async ({data, navigate}, {rejectedWithValue}) => {
        try {
            const res = await postApi('/user/login', data)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '로그인 성공',
                showConfirmButton: false,
                timer: 1500
            })
            localStorage.setItem('token', res.headers.authorization)
            navigate('/main')
            return res.data
        } catch (err) {
            Swal.fire({
                text: err.response.data.exception,
                icon: 'error'
            })
            return rejectedWithValue(err.response)
        }
    }
)

export const login2 = createAsyncThunk(
    'user/login',
    async ({data, join, navigate}, {rejectedWithValue}) => {
        try {
            const res = await postApi('/user/login', data)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '로그인 성공',
                showConfirmButton: false,
                timer: 1500
            })
            localStorage.setItem('token', res.headers.authorization)
            navigate(`/detail/${join}`)
            return res.data
        } catch (err) {
            Swal.fire({
                text: err.response.data.exception,
                icon: 'error'
            })
            return rejectedWithValue(err.response)
        }
    }
)


export const logout = createAsyncThunk(
    'user/logout',
    async (navigate, {rejectedWithValue}) => {
        const data = {
            data: '',
        }
        try {
            const res = await postApi('/user/logout', data);
            localStorage.removeItem('token');
            setTimeout(() => navigate('/login'), 30)
            return {
                data: res.data,
            }
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const changePic = createAsyncThunk(
    'member/profile',
    async (file, {rejectWithValue}) => {
        console.log(file)
        const profileImg = new FormData();
        profileImg.append("profileImg", file);
        try {
            await putApi('/member/profile', profileImg, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
        } catch (err) {
            return rejectWithValue(err.response.data.msg)
        }
    }
)

export const setFCMToken = createAsyncThunk(
    'plan/setFCMToken',
    async (data, {rejectWithValue}) => {
        try {
            return await postApi(`/member/devices`, data)
                .then(response => response.data.data);
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);

export const isFCMToken = createAsyncThunk(
    'plan/isFCMToken',
    async (data, {rejectWithValue}) => {
        try {
            return await postApi(`/member/alarms`, data)
                .then(response => response.data.data);
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);

export const getUserToken = createAsyncThunk(
    'user/getUserToken',
    async (_, {rejectedWithValue}) => {
        try {
            const res = await getApi('/users/kakao/callback')
            console.log(res)
            return {
                data: res.data.data,
            }
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const kakaoLogin = createAsyncThunk(
    'user/kakaoLogin',
    async (code, {rejectedWithValue}) => {
        try {
            const res = await getApi(`/users/kakao/callback?code=${code}`)
            if(res.headers.authorization){
                const ACCESS_TOKEN = res.headers.authorization;
                localStorage.setItem('token', ACCESS_TOKEN);
                history.push("/main");
                return res.data
            } else {
                history.push("/login")
            }
            return
        } catch (err) {
            console.log("카카오 로그인 실패")
            history.push("/login")
            return rejectedWithValue(err)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.user = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        resetUser: (state) => {
            Object.assign(state, initialState)
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    },
    extraReducers: {
        // user/signup/pending === signUp.pending
        [signUp.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        // user/signup/fulfilled === signUp.fulfilled
        [signUp.fulfilled]: (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'succeeded'
            }
        },
        // user/signUp/rejected === signUp.rejected
        [signUp.rejected]: (state, action) => {
            if (state.loading === 'pending') {
                state.error = action.payload.msg
                state.loading = 'idle'
            }
        },
        // user/login/fulfilled === login.fulfilled
        [login.fulfilled]: (state, action) => {
            state.user_info = action.payload
        },
        [setFCMToken.fulfilled]: (state, action) => {
        },
        [isFCMToken.fulfilled]: (state, action) => {
        },
        [getUserToken.fulfilled]: (state, action) => {
            state.is_login = true
        },
        [kakaoLogin.fulfilled]: (state, action) => {
            state.user_info = action.payload
        }
    },
})


// 2
export const {setUserName, setLoading, resetUser, setError} = userSlice.actions

const actionCreators = {kakaoLogin};
export {actionCreators};

export default userSlice.reducer