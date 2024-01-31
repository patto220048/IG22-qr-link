import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUrl: [],
    loading: false,
    error: false,
};
export const urlSlice = createSlice({
    name: 'url',
    initialState,
    reducers: {
        urlStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        urlSuccess: (state, action) => {
            state.loading = false;
            state.error = false;
            state.currentUrl = [...action.payload];
        },
        urlFail: (state) => {
            state.loading = false;
            state.error = true;
        },
        urlAdd: (state, action) => {
            state.loading = false;
            state.error = false;
            state.currentUrl.push(action.payload);
        },
        urlDelete: (state, action) => {
            state.loading = false;
            state.error = false;
            state.currentUrl.map((url) => {
                if (url._id === action.payload) {
                    state.currentUrl.splice(
                        state.currentUrl.findIndex((url) => url._id === action.payload),
                        1,
                    );
                }
            });
        },
        urlUpdate: (state, action) => {
            state.loading = false;
            state.error = false;    
            state.currentUrl.map((url)=>{
                if(url._id === action.payload._id)
                {
                    url.urlTitle = action.payload.urlTitle
                    url.url = action.payload.url    
                    url.urlThumbnail= action.payload.urlThumbnail
                    url.acticve = action.payload.acticve
                    url.thumbnailImage = action.payload.thumbnailImage
                    
                }
            })
        }
    },
});

// Action creators are generated for each case reducer function
export const { urlStart, urlSuccess, urlFail, urlAdd, urlDelete,urlUpdate } = urlSlice.actions;

export default urlSlice.reducer;
