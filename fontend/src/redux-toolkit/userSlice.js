import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: '',
    loading: false,
    error: false,
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = false
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.error = false
            state.currentUser = action.payload;
        },
        loginFail: (state) => {
            state.loading = false;
            state.error = true;
        },
        updateData: (state,action) => {
            state.loading = false;
            state.error = false;
            state.currentUser = {...action.payload};
        },
        deleteFileImg: (state, action) => {
            state.currentUser.avtImg = action.payload;

        },
        logout: () => {
            return initialState;
        }
    },
});

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFail, logout , updateData,deleteFileImg} = userSlice.actions;

export default userSlice.reducer;
