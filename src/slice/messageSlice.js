import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: false,
    type: '',
    message: '',
};

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.open = true;
            state.type = action.payload.type;
            state.message = action.payload.message;
        },
        clearMessage: (state) => {
            state.open = false;
            state.type = '';
            state.message = '';
        },
    },
});

export const { setMessage, clearMessage } = messageSlice.actions;

export default messageSlice.reducer;
