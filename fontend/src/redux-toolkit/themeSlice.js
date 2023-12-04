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
        themeIsloading: (state, action) => {
            state.loading = false;
            state.error = false;
        },
        clearBgImg: (state, action) => {
            state.currentTheme.backgroundImg = null
            state.currentTheme.backgroundImgName = null
            state.loading = false;
            state.error = false;
        },
        clearBgVideo: (state, action) => {
            state.currentTheme.backgroundVideo = null
            state.currentTheme.backgroundVideoName = null
            state.loading = false;
            state.error = false;
        }

    },
});

// Action creators are generated for each case reducer function
export const { themeStart, themeSuccess, themeFail, updateTheme,themeIsloading,clearBgImg,clearBgVideo } = themeSlice.actions;

export default themeSlice.reducer;
