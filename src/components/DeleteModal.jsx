import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import React from 'react';

export const DeleteModal = ({ open, setOpen, handleDelete, title }) => {
    const handleClose = (e, reason) => {
        if (reason === 'backdropClick') {
            return;
        } else {
            setOpen(false);
        }
    };

    const deleteProduct = async () => {
        try {
            await handleDelete();
        } catch (error) {
            console.log(error);
        } finally {
            setOpen(false);
        }
    };

    return (
        <Dialog
            fullWidth
            maxWidth={'sm'}
            open={open}
            aria-labelledby='modal-modal-title'
        >
            <DialogTitle aria-label='modal-modal-title' fontWeight={'bold'}>
                刪除確認
            </DialogTitle>
            <DialogContent aria-label='modal-modal-description'>
                刪除 {title}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                    aria-label='close'
                    variant='outlined'
                    size='large'
                    onClick={(e, reason) => handleClose(e, reason)}
                >
                    取消
                </Button>
                <Button
                    type='submit'
                    aria-label='confirm'
                    variant='contained'
                    size='large'
                    color='warning'
                    onClick={deleteProduct}
                >
                    確認
                </Button>
            </DialogActions>
        </Dialog>
    );
};
