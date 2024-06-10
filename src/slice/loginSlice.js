import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login: false,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setlogin: (state, action) => {
            state.login = action.payload;
        },
    },
});

export const { setlogin } = loginSlice.actions;

export default loginSlice.reducer;
