import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from '../redux-toolkit/userSlice';
import themeReducer from '../redux-toolkit/themeSlice';
import iconReducer from '../redux-toolkit/iconSlice';
import urlSlice from '../redux-toolkit/UrlSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root ',
    version: 1,
    storage,
};
const rootReducer = combineReducers({ theme: themeReducer, user: userReducer, icon: iconReducer, url:urlSlice});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
