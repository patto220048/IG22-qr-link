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
        addThemeIcon: (state, action) => {
            state.currentTheme.icons.push(action.payload)
        },
        deleteThemeIcon: (state, action) => {
            state.currentTheme.icons.map((icon) => {
                if (icon._id === action.payload._id) {
                    state.currentTheme.icons.splice(state.currentTheme.icons.findIndex(
                        icon=> icon._id === action.payload._id
                    ),1)
                }
            })
                
            
        },
        themeIsloading: (state, action) => {
            state.loading = false;
            state.error = false;
        },

    },
});

// Action creators are generated for each case reducer function
export const { themeStart, themeSuccess, themeFail, updateTheme, addThemeIcon,deleteThemeIcon,themeIsloading } = themeSlice.actions;

export default themeSlice.reducer;
