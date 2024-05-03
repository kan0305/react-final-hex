import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Alert,
    Grid,
    InputLabel,
    Stack,
    Box,
    styled,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';

const VisuallyHiddenInput = styled(TextField)({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const ProductModal = ({ open, setOpen }) => {
    const [openAlert, setOpenAlert] = useState(false);

    const [uploadFile, setUploadFile] = useState('');

    const handleClose = (e, reason) => {
        if (reason === 'backdropClick') {
            setOpenAlert(true);
            return;
        } else {
            setOpen(false);
            setOpenAlert(false);
        }
    };

    const handleAddProduct = () => {
        console.log('add product');
        setOpen(false);
        setOpenAlert(false);
    };

    const handleUploadFile = (e) => {
        console.log('upload file');
        if (e.target.files) {
            console.log(e.target.files[0]);
            setUploadFile(e.target.files[0]);
        }
    };

    return (
        <Dialog
            fullWidth
            maxWidth={'md'}
            open={open}
            onClose={(e, reason) => handleClose(e, reason)}
            aria-labelledby='modal-modal-title'
        >
            <DialogTitle aria-label='modal-modal-title'>
                建立新產品
                {openAlert && <Alert severity='error'>請輸入產品名稱</Alert>}
            </DialogTitle>
            <DialogContent aria-label='modal-modal-description'>
                <Grid container spacing={2}>
                    <Grid item sm={4} xs={12}>
                        <Stack direction={'column'} spacing={1}>
                            <Box>
                                <InputLabel htmlFor='imageUrl'>
                                    輸入圖片網址
                                </InputLabel>
                                <TextField
                                    type='url'
                                    id='imageUrl'
                                    name='imageUrl'
                                    size='small'
                                    fullWidth
                                    variant='outlined'
                                />
                            </Box>
                            <Box>
                                <InputLabel htmlFor='uploadfile'>
                                    或上傳圖檔
                                </InputLabel>
                                <Button
                                    component='label'
                                    role={undefined}
                                    variant='contained'
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload file
                                    <VisuallyHiddenInput
                                        type='file'
                                        onChange={handleUploadFile}
                                    />
                                </Button>
                                {uploadFile && (
                                    <Box component={'span'} ml={1}>
                                        {uploadFile.name}
                                    </Box>
                                )}
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item sm={8} xs={12}>
                        <InputLabel htmlFor='title'>標題</InputLabel>
                        <TextField
                            type='text'
                            id='title'
                            name='title'
                            size='small'
                            fullWidth
                            variant='outlined'
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            {/* <DialogContent aria-label='modal-modal-description'>
                <DialogContentText>產品名稱</DialogContentText>
                <TextField autoFocus type='text' fullWidth variant='standard' onChange={handleInputChange} />
            </DialogContent> */}
            <DialogActions>
                <Button aria-label='add' onClick={handleAddProduct}>
                    新增
                </Button>
                <Button
                    aria-label='close'
                    onClick={(e, reason) => handleClose(e, reason)}
                >
                    關閉
                </Button>
            </DialogActions>
        </Dialog>
    );
};
