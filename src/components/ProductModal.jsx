import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControlLabel,
    Grid,
    InputLabel,
    Stack,
    TextField,
    styled,
} from '@mui/material';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import useProductService from '../service/useProductService';

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

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            imageUrl: '',
            title: '',
            category: '',
            description: '',
            content: '',
            price: '',
            origin_price: '',
            unit: '',
            is_enabled: '',
        },
    });

    const productService = useProductService();

    const addProductRef = useRef(null);

    if (!addProductRef.current)
        addProductRef.current = productService.addProduct;

    const addProduct = addProductRef.current;

    const handleAddProduct = async (formData) => {
        let postData = { ...formData };

        for (const key in postData) {
            if (key === 'is_enabled') {
                postData[key] = postData[key] ? 1 : 0;
            } else if (key === 'origin_price' || key === 'price') {
                postData[key] = Number(postData[key]);
            }
        }
        
        try {
            const result = await addProduct({ data: postData });
            console.log(result);
        } catch (error) {
            console.log(error);
        } finally {
            setOpen(false);
            setOpenAlert(false);
            reset();
        }
    };

    const handleClose = (e, reason) => {
        if (reason === 'backdropClick') {
            setOpenAlert(true);
            return;
        } else {
            setOpen(false);
            setOpenAlert(false);
            reset();
        }
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
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(handleAddProduct),
            }}
        >
            <DialogTitle aria-label='modal-modal-title'>
                建立新產品
                {openAlert && (
                    <Alert severity='error' sx={{ mt: 1 }}>
                        請輸入產品資訊
                    </Alert>
                )}
            </DialogTitle>
            <DialogContent aria-label='modal-modal-description'>
                <Grid container spacing={2}>
                    <Grid item sm={4} xs={12}>
                        <Stack direction={'column'} spacing={1}>
                            <Box>
                                <InputLabel htmlFor='image'>
                                    輸入圖片網址
                                </InputLabel>
                                <TextField
                                    type='url'
                                    id='image'
                                    name='imageUrl'
                                    size='small'
                                    fullWidth
                                    variant='outlined'
                                    placeholder='請輸入圖片連結'
                                    {...register('imageUrl')}
                                />
                            </Box>
                            <Box>
                                <InputLabel htmlFor='customFile'>
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
                                        id='customFile'
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
                        <Stack direction={'column'} spacing={2}>
                            <Box>
                                <InputLabel htmlFor='title'>標題</InputLabel>
                                <TextField
                                    type='text'
                                    id='title'
                                    name='title'
                                    size='small'
                                    fullWidth
                                    variant='outlined'
                                    placeholder='請輸入標題'
                                    {...register('title')}
                                />
                            </Box>
                            <Grid container justifyContent={'space-between'}>
                                <Grid
                                    item
                                    sm={6}
                                    xs={12}
                                    sx={{ pr: { sm: 1, xs: 0 } }}
                                >
                                    <InputLabel htmlFor='category'>
                                        分類
                                    </InputLabel>
                                    <TextField
                                        type='text'
                                        id='category'
                                        name='category'
                                        size='small'
                                        fullWidth
                                        variant='outlined'
                                        placeholder='請輸入分類'
                                        {...register('category')}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    sm={6}
                                    xs={12}
                                    sx={{ pl: { sm: 1, xs: 0 } }}
                                >
                                    <InputLabel htmlFor='unit'>單位</InputLabel>
                                    <TextField
                                        type='text'
                                        id='unit'
                                        name='unit'
                                        size='small'
                                        fullWidth
                                        variant='outlined'
                                        placeholder='請輸入單位'
                                        {...register('unit')}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid
                                    item
                                    sm={6}
                                    xs={12}
                                    sx={{ pr: { sm: 1, xs: 0 } }}
                                >
                                    <InputLabel htmlFor='origin_price'>
                                        原價
                                    </InputLabel>
                                    <TextField
                                        type='number'
                                        id='origin_price'
                                        name='origin_price'
                                        size='small'
                                        fullWidth
                                        variant='outlined'
                                        placeholder='請輸入原價'
                                        {...register('origin_price', {
                                            min: 0,
                                        })}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    sm={6}
                                    xs={12}
                                    sx={{ pl: { sm: 1, xs: 0 } }}
                                >
                                    <InputLabel htmlFor='price'>
                                        售價
                                    </InputLabel>
                                    <TextField
                                        type='number'
                                        id='price'
                                        name='price'
                                        size='small'
                                        fullWidth
                                        variant='outlined'
                                        placeholder='請輸入售價'
                                        {...register('price', {
                                            min: 0,
                                        })}
                                    />
                                </Grid>
                            </Grid>
                            <Divider />
                            <Box>
                                <InputLabel htmlFor='description'>
                                    產品描述
                                </InputLabel>
                                <TextField
                                    type='text'
                                    id='description'
                                    name='description'
                                    size='small'
                                    fullWidth
                                    variant='outlined'
                                    placeholder='請輸入產品描述'
                                    multiline
                                    rows={4}
                                    {...register('description')}
                                />
                            </Box>
                            <Box>
                                <InputLabel htmlFor='content'>
                                    產品說明
                                </InputLabel>
                                <TextField
                                    type='text'
                                    id='content'
                                    name='content'
                                    size='small'
                                    fullWidth
                                    variant='outlined'
                                    placeholder='請輸入產品說明'
                                    multiline
                                    rows={4}
                                    {...register('content')}
                                />
                            </Box>
                        </Stack>
                        <FormControlLabel
                            control={<Checkbox size='small' />}
                            label='是否啟用'
                            name='is_enabled'
                            id='is_enabled'
                            {...register('is_enabled')}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                    aria-label='close'
                    variant='outlined'
                    size='large'
                    onClick={(e, reason) => handleClose(e, reason)}
                >
                    關閉
                </Button>
                <Button
                    type='submit'
                    aria-label='add'
                    variant='contained'
                    size='large'
                    color='warning'
                >
                    儲存
                </Button>
            </DialogActions>
        </Dialog>
    );
};
