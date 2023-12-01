import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentIcon: '',
    loading: false,
    error: false,
};
export const iconSlice = createSlice({
    name: 'icon',
    initialState,
    reducers: {
        iconStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        iconSuccess: (state, action) => {
            state.loading = false;
            state.error = false;
            state.currentIcon = action.payload;
        },
        iconFail: (state) => {
            state.loading = false;
            state.error = true;
        },
        iconUpdate: (state, action) => {
            state.loading = false;
            state.error = false;
            state.currentIcon ={... action.payload};
        }
    },
});

// Action creators are generated for each case reducer function
export const { iconStart, iconSuccess, iconFail,iconUpdate} = iconSlice.actions;

export default iconSlice.reducer;
