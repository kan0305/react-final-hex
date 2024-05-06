import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
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
    OutlinedInput,
    Stack,
    TextField,
    styled,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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

export const ProductModal = ({
    open,
    setOpen,
    getProducts,
    type,
    tempProduct,
}) => {
    const [uploadFile, setUploadFile] = useState('');

    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            imageUrl: '',
            title: '',
            category: '',
            description: '',
            content: '',
            price: 0,
            origin_price: 0,
            unit: '',
            is_enabled: true,
        },
    });

    useEffect(() => {
        if (type === 'edit') {
            let product = { ...tempProduct };
            product.is_enabled = product.is_enabled ? true : false;
            reset(product);
        } else if (type === 'create') {
            reset({
                imageUrl: '',
                title: '',
                category: '',
                description: '',
                content: '',
                price: 0,
                origin_price: 0,
                unit: '',
                is_enabled: true,
            });
        }
    }, [type, tempProduct, reset]);

    const productService = useProductService();

    const addProductRef = useRef(null);

    const editProductRef = useRef(null);

    // 以 addProductRef 紀錄 addProduct，防止重複渲染
    if (!addProductRef.current)
        addProductRef.current = productService.addProduct;

    // 以 editProductRef 紀錄 editProduct，防止重複渲染
    if (!editProductRef.current)
        editProductRef.current = productService.editProduct;

    const addProduct = addProductRef.current;

    const editProduct = editProductRef.current;

    const submit = async (formData) => {
        console.log(formData);
        let postData = { ...formData };

        for (const key in postData) {
            if (key === 'is_enabled') {
                postData[key] = postData[key] ? 1 : 0;
            } else if (key === 'origin_price' || key === 'price') {
                postData[key] = Number(postData[key]);
            }
        }

        try {
            let result;

            if (type === 'edit') {
                result = await editProduct(tempProduct.id, { data: postData });
            } else if (type === 'create') {
                result = await addProduct({ data: postData });
            }

            if (result.data.success) {
                getProducts();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setOpen(false);
            reset();
        }
    };

    const handleClose = (e, reason) => {
        if (reason === 'backdropClick') {
            return;
        } else {
            setOpen(false);
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
                onSubmit: handleSubmit(submit),
            }}
        >
            <DialogTitle aria-label='modal-modal-title' fontWeight={'bold'}>
                {type === 'create' ? '新增產品' : '編輯產品'}
            </DialogTitle>
            <DialogContent aria-label='modal-modal-description'>
                <Grid container spacing={2}>
                    <Grid item sm={4} xs={12}>
                        <Stack direction={'column'} spacing={1}>
                            <Controller
                                name='imageUrl'
                                control={control}
                                render={({ field }) => (
                                    <Box>
                                        <InputLabel htmlFor='imageUrl'>
                                            輸入圖片網址
                                        </InputLabel>
                                        <OutlinedInput
                                            type='url'
                                            id='imageUrl'
                                            size='small'
                                            fullWidth
                                            placeholder='請輸入圖片連結'
                                            {...field}
                                        />
                                    </Box>
                                )}
                            />
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
                            <Controller
                                name='title'
                                control={control}
                                render={({ field }) => (
                                    <Box>
                                        <InputLabel htmlFor='title'>
                                            標題
                                        </InputLabel>
                                        <OutlinedInput
                                            type='text'
                                            id='title'
                                            size='small'
                                            fullWidth
                                            placeholder='請輸入標題'
                                            {...field}
                                        />
                                    </Box>
                                )}
                            />
                            <Grid container justifyContent={'space-between'}>
                                <Controller
                                    name='category'
                                    control={control}
                                    render={({ field }) => (
                                        <Grid
                                            item
                                            sm={6}
                                            xs={12}
                                            sx={{ pr: { sm: 1, xs: 0 } }}
                                        >
                                            <InputLabel htmlFor='category'>
                                                分類
                                            </InputLabel>
                                            <OutlinedInput
                                                type='text'
                                                id='category'
                                                size='small'
                                                fullWidth
                                                placeholder='請輸入分類'
                                                {...field}
                                            />
                                        </Grid>
                                    )}
                                />
                                <Controller
                                    name='unit'
                                    control={control}
                                    render={({ field }) => (
                                        <Grid
                                            item
                                            sm={6}
                                            xs={12}
                                            sx={{ pl: { sm: 1, xs: 0 } }}
                                        >
                                            <InputLabel htmlFor='unit'>
                                                單位
                                            </InputLabel>
                                            <OutlinedInput
                                                type='text'
                                                id='unit'
                                                size='small'
                                                fullWidth
                                                placeholder='請輸入單位'
                                                {...field}
                                            />
                                        </Grid>
                                    )}
                                />
                            </Grid>
                            <Grid container>
                                <Controller
                                    name='origin_price'
                                    control={control}
                                    render={({ field }) => (
                                        <Grid
                                            item
                                            sm={6}
                                            xs={12}
                                            sx={{ pr: { sm: 1, xs: 0 } }}
                                        >
                                            <InputLabel htmlFor='origin_price'>
                                                原價
                                            </InputLabel>
                                            <OutlinedInput
                                                type='number'
                                                id='origin_price'
                                                size='small'
                                                fullWidth
                                                placeholder='請輸入原價'
                                                {...field}
                                            />
                                        </Grid>
                                    )}
                                />
                                <Controller
                                    name='price'
                                    control={control}
                                    render={({ field }) => (
                                        <Grid
                                            item
                                            sm={6}
                                            xs={12}
                                            sx={{ pl: { sm: 1, xs: 0 } }}
                                        >
                                            <InputLabel htmlFor='price'>
                                                售價
                                            </InputLabel>
                                            <OutlinedInput
                                                type='number'
                                                id='price'
                                                size='small'
                                                fullWidth
                                                placeholder='請輸入售價'
                                                {...field}
                                            />
                                        </Grid>
                                    )}
                                />
                            </Grid>
                            <Divider />
                            <Controller
                                name='description'
                                control={control}
                                render={({ field }) => (
                                    <Box>
                                        <InputLabel htmlFor='description'>
                                            產品描述
                                        </InputLabel>
                                        <OutlinedInput
                                            type='text'
                                            id='description'
                                            size='small'
                                            fullWidth
                                            placeholder='請輸入產品描述'
                                            multiline
                                            rows={4}
                                            {...field}
                                        />
                                    </Box>
                                )}
                            />
                            <Controller
                                name='content'
                                control={control}
                                render={({ field }) => (
                                    <Box>
                                        <InputLabel htmlFor='content'>
                                            產品說明
                                        </InputLabel>
                                        <OutlinedInput
                                            type='text'
                                            id='content'
                                            size='small'
                                            fullWidth
                                            placeholder='請輸入產品說明'
                                            multiline
                                            rows={4}
                                            {...field}
                                        />
                                    </Box>
                                )}
                            />
                        </Stack>
                        <Controller
                            name='is_enabled'
                            control={control}
                            render={({ field: { value, ...field } }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size='small'
                                            checked={value}
                                            {...field}
                                        />
                                    }
                                    label='是否啟用'
                                />
                            )}
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
