import { Alert, Snackbar, Slide } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from '../slice/messageSlice';

export const Message = () => {
    const { open, type, message } = useSelector((state) => state.message);

    const dispatch = useDispatch();

    const close = () => {
        dispatch(clearMessage());
    };

    const transitionType = (props) => {
        return <Slide {...props} direction='up' />;
    };

    return (
        <React.Fragment>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={close}
                TransitionComponent={transitionType}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                sx={{ zIndex: (theme) => theme.zIndex.snackbar + 1 }}
            >
                <Alert severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
};
