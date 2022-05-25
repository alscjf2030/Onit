import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {postApi, getApi, putApi, deleteApi} from "../../shared/api/client";
import Swal from "sweetalert2";
import history from '../../index'

export const getPlan = createAsyncThunk(
    'plan/getPlan',
    async (page, {rejectedWithValue}) => {
        try {
            const res = await getApi(`/member/plans/${page}`)
            return res.data
        } catch (err) {
            console.log(err.response)
            return rejectedWithValue(err.response)
        }
    }
)

export const getMorePlan = createAsyncThunk(
    'plan/getMorePlan',
    async ({page}, {rejectedWithValue}) => {
        try {
            const res = await getApi(`/member/plans/${page}`)
            return res.data.myPlanList.planLists
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
            console.log(err)
            return rejectedWithValue(err.response)
        }
    }
)

export const addPlan = createAsyncThunk(
    'plan/addPlan',
    async (data, {rejectedWithValue}) => {
        try {
            const res = await postApi('/member/plan', data)
            history.push('/main')
            return res.data
        } catch (err) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: `${err.response.data.msg}`,
                showConfirmButton: false,
                timer: 2000
            })
            return rejectedWithValue(err.response.data)
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
            console.log(err.response.data.error)
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

const initialState = {
    today: [],
    created: {
            plans: [],
            totalPage: 0,
            },
    _today: [],
    invited: {
            plans: [],
            totalPage: 0,
            },
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
            state = action.payload
        },
        resetPlan: (state) => {
            Object.assign(state, initialState)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getPlan.fulfilled, (state, action) => {
                const {totalPage, planLists} = action.payload.myPlanList;
                state.today = action.payload.myFirstPlanDto;
                state.created.plans = planLists;
                state.created.totalPage = totalPage;
                state.invited.plans = action.payload.invitedPlanList.planLists;
                state.invited.totalPage = action.payload.invitedPlanList.totalPage;
                state._today = action.payload.myFirstInvitedPlanDto;
            })
            .addCase(getMorePlan.pending, state => {
                if (state?.loading === 'idle'){
                    state.loading = 'pending'
                }
            })
            .addCase(getMorePlan.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.loading = 'succeeded'
                    // state.created.plans = [...state.created.plans, ...action.payload.myPlanList];
                    // state.invited.plans = [...state.invited.plans, ...action.payload.invitedPlanlist];
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
                state.today = state.today.map((plan) => plan.planId === action.payload.planId ? action.payload : plan)
                state.created.plans = state.created.plans.map((plan) => plan.planId === action.payload.planId ? action.payload : plan)
                window.location.reload()
            })
            .addCase(deletePlan.fulfilled, (state, action) => {
                state.showplan = null
                // state.plans = state.plans.filter((plan) => plan.planId !== action.payload)
            })
    }
})

export const {setLoading, getPlanList, resetPlan} = planSlice.actions

export default planSlice.reducer