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
            state.error = false;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.error = false;
            state.currentUser = action.payload;
        },
        loginFail: (state) => {
            state.loading = false;
            state.error = true;
        },
        updateData: (state, action) => {
            state.loading = false;
            state.error = false;
            state.currentUser = { ...action.payload };
        },
        deleteFileImg: (state, action) => {
            state.currentUser.avtImg = action.payload;
        },
        addThemeIcon: (state, action) => {
            state.currentUser.groupIcon.push(action.payload);
        },
        deleteThemeIcon: (state, action) => {
            state.currentUser.groupIcon.map((icon) => {
                if (icon._id === action.payload._id) {
                    state.currentUser.groupIcon.splice(
                        state.currentUser.groupIcon.findIndex((icon) => icon._id === action.payload._id),
                        1,
                    );
                }
            });
        },
        logout: () => {
            return initialState;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFail, logout, updateData, deleteFileImg, addThemeIcon, deleteThemeIcon } =
    userSlice.actions;

export default userSlice.reducer;
