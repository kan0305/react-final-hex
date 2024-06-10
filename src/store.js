import { configureStore } from '@reduxjs/toolkit';
import messageSlice from './slice/messageSlice';
import loadingSlice from './slice/loadingSlice';
import loginSlice from './slice/loginSlice';

const store = configureStore({
    reducer: {
        login: loginSlice,
        loading: loadingSlice,
        message: messageSlice,
    },
});

export default store;
