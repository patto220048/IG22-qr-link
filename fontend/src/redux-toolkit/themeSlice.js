import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentTheme: '',
    loading: false,
    error: false,
};
export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        themeStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        themeSuccess: (state, action) => {
            state.loading = false;
            state.error = false;
            state.currentTheme = action.payload;
        },
        themeFail: (state) => {
            state.loading = false;
            state.error = true;
        },
        updateTheme: (state, action) => {
            state.loading = false;
            state.error = false;
            state.currentTheme = { ...action.payload };
        },
    },
});

// Action creators are generated for each case reducer function
export const { themeStart, themeSuccess, themeFail, updateTheme } = themeSlice.actions;

export default themeSlice.reducer;