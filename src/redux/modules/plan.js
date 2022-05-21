import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {postApi, getApi, putApi, deleteApi} from "../../shared/api/client";
import Swal from "sweetalert2";

export const getPlan = createAsyncThunk(
    'plan/getPlan',
    async (page, {rejectedWithValue}) => {
        try {
            const res = await getApi(`/member/plans/${page}`)
            return res.data
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const getMorePlan = createAsyncThunk(
    'plan/getMorePlan',
    async ({page}, {rejectedWithValue}) => {
        try {
            const res = await getApi(`/member/plans/${page}`)
            return res.data.data.planList
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const getOnePlan = createAsyncThunk(
    `plan/getOnePlan`,
    async (planUrl, {rejectedWithValue}) => {
        try {
            const res = await getApi(`/member/plan/${planUrl}`)
            const {data} = res.data
            return data
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const getHistoryPlan = createAsyncThunk(
    'plan/getHistoryPlan',
    async (_, {rejectedWithValue}) => {
        try {
            const res = await getApi('/member/history/1')
            console.log(res)
            return res.data
        } catch (err) {
            // window.alert(err.response.data.message)
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const addPlan = createAsyncThunk(
    'plan/addPlan',
    async ({data, navigate}, {rejectedWithValue}) => {
        console.log(data)
        try {
            const res = await postApi('/member/plan', data)
            navigate('/main')
            return res.data
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const joinPlan = createAsyncThunk(
    'plan/joinPlan',
    async (url, {rejectWithValue}) => {
        try {
            const res = await postApi(`/invitation/${url}`)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '약속에 참여하였 습니다.',
                showConfirmButton: false,
                timer: 1500
            })
            return res.data
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response)
        }
    }
)

export const editPlan = createAsyncThunk(
    'plan/editPlan',
    async ({data, navigate}, {rejectedWithValue}) => {
        console.log(data)
        try {
            const res = await putApi(`/member/plan/${data.planUrl}`, data)
            console.log(res)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '수정 완료',
                showConfirmButton: false,
                timer: 1500
            })
            navigate(`/detail/${data.planUrl}`)
            return res.data
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const deletePlan = createAsyncThunk(
    'plan/deletePlan',
    async ({planUrl, navigate}, {rejectedWithValue}) => {
        // console.log(planId)
        try {
            const res = await deleteApi(`/member/plan/${planUrl}`)
            console.log(res)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '삭제 완료',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/main')
            return planUrl
        } catch (err) {
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const setFCMTokenplan = createAsyncThunk(
    'plan/setFCMTokenplan',
    async (data, { rejectWithValue }) => {
        const newdata = {
            ...data,
            planId: 1,
        };
        try {
            return await postApi(`/api/fcm`, newdata)
                .then(response => response.data.data);
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);

const initialState = {
    plans: [],
    totalPage: 1,
    showplan: null,
    loading: 'idle',
}

export const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        getPlanList: (state, action) => {
            state.plans = action.payload
        },
        resetPlan: (state) => {
            Object.assign(state, initialState)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getPlan.fulfilled, (state, action) => {
                const {totalPage, planLists} = action.payload.myPlanList
                state.plans = planLists;
                state.totalPage = totalPage
            })
            .addCase(getMorePlan.pending, state => {
                if (state?.loading === 'idle'){
                    state.loading = 'pending'
                }
            })
            .addCase(getMorePlan.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.loading = 'succeeded'
                    state.plans = [...state.plans, ...action.payload];
                }
            })
            .addCase(getMorePlan.rejected, state => {
                if (state.loading === 'pending') {
                    state.loading = 'failed'
                }
            })
            .addCase(getOnePlan.fulfilled, (state, action) => {
                state.showplan = action.payload;
            })
            .addCase(addPlan.fulfilled, (state, action) => {

            })
            .addCase(joinPlan.fulfilled, (state, action) => {
            })
            .addCase(editPlan.fulfilled, (state, action) => {
                const data = {...state.showplan, ...action.payload}
                state.showplan = data
                state.plans = state.plans.map((plan) => plan.planId === action.payload.planId ? action.payload : plan)
            })
            .addCase(deletePlan.fulfilled, (state, action) => {
                state.showplan = null
                state.plans = state.plans.filter((plan) => plan.planId !== action.payload)
            })
            .addCase(setFCMTokenplan.fulfilled, (state, action) => {});
    }
})

export const {setLoading, getPlanList, resetPlan} = planSlice.actions

export default planSlice.reducer