import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Box,
    InputLabel,
    OutlinedInput,
    Grid,
    FormHelperText,
} from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useCouponService from '../service/useCouponService';

export const CouponModal = ({ open, setOpen, getCoupons, type, tempCoupon }) => {
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            title: '',
            code: '',
            percent: 0,
            due_date: '',
            is_enabled: true,
        },
    });

    const couponService = useCouponService();

    const addCouponRef = useRef(null);

    const editCouponRef = useRef(null);

    if (!addCouponRef.current) addCouponRef.current = couponService.addCoupon;

    if (!editCouponRef.current) editCouponRef.current = couponService.editCoupon;

    useEffect(() => {
        if (type === 'edit') {
            let coupon = { ...tempCoupon };
            coupon.is_enabled = coupon.is_enabled ? true : false;
            coupon.due_date =
                new Date(coupon.due_date).getFullYear() +
                '-' +
                (new Date(coupon.due_date).getMonth() + 1).toString().padStart(2, '0') +
                '-' +
                new Date(coupon.due_date).getDate().toString().padStart(2, '0');
            reset(coupon);
        } else if (type === 'create') {
            reset({
                title: '',
                code: '',
                percent: '',
                due_date: '',
                is_enabled: true,
            });
        }
    }, [type, tempCoupon, reset]);

    const handleClose = (e, reason) => {
        if (reason === 'backdropClick') {
            return;
        } else {
            setOpen(false);
        }
    };

    const submit = async (formData) => {
        let postData = { ...formData };

        for (const key in postData) {
            if (key === 'is_enabled') {
                postData[key] = postData[key] ? 1 : 0;
            } else if (key === 'percent') {
                postData[key] = Number(postData[key]);
            } else if (key === 'due_date') {
                postData[key] = new Date(postData[key]).getTime();
            }
        }

        try {
            let result;

            if (type === 'edit') {
                result = await editCouponRef.current(tempCoupon.id, { data: postData });
            } else if (type === 'create') {
                result = await addCouponRef.current({ data: postData });
            }

            if (result.data.success) {
                getCoupons();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setOpen(false);
            reset();
        }
    };

    return (
        <Dialog
            fullWidth
            maxWidth={'md'}
            open={open}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(submit),
            }}
        >
            <DialogTitle aria-label='modal-modal-title' fontWeight={'bold'}>
                {type === 'create' ? '建立新優惠券' : '編輯優惠券'}
            </DialogTitle>
            <DialogContent aria-label='modal-modal-description'>
                <Stack direction={'column'} spacing={2}>
                    <Controller
                        control={control}
                        name='title'
                        render={({ field, fieldState: { invalid, error } }) => (
                            <Box>
                                <InputLabel htmlFor='title'>標題</InputLabel>
                                <OutlinedInput
                                    error={invalid}
                                    type='text'
                                    id='title'
                                    size='small'
                                    fullWidth
                                    placeholder='請輸入標題'
                                    {...field}
                                />
                                {invalid && <FormHelperText error>{error?.message}</FormHelperText>}
                            </Box>
                        )}
                        rules={{ required: { value: true, message: '標題為必填' } }}
                    />

                    <Grid container justifyContent={'space-between'}>
                        <Controller
                            control={control}
                            name='percent'
                            render={({ field, fieldState: { invalid, error } }) => (
                                <Grid item sm={6} xs={12} sx={{ pr: { sm: 1, xs: 0 } }}>
                                    <InputLabel htmlFor='percent'>折扣（%）</InputLabel>
                                    <OutlinedInput
                                        error={invalid}
                                        type='text'
                                        id='percent'
                                        size='small'
                                        fullWidth
                                        placeholder='請輸入折扣（%）'
                                        {...field}
                                    />
                                    {invalid && <FormHelperText error>{error?.message}</FormHelperText>}
                                </Grid>
                            )}
                            rules={{ required: { value: true, message: '折扣為必填' } }}
                        />

                        <Controller
                            control={control}
                            name='due_date'
                            render={({ field, fieldState: { invalid, error } }) => (
                                <Grid item sm={6} xs={12} sx={{ pl: { sm: 1, xs: 0 } }}>
                                    <InputLabel htmlFor='due_date'>到期日</InputLabel>
                                    <OutlinedInput
                                        error={invalid}
                                        type='date'
                                        id='due_date'
                                        size='small'
                                        fullWidth
                                        placeholder='請輸入到期日'
                                        {...field}
                                    />
                                    {invalid && <FormHelperText error>{error?.message}</FormHelperText>}
                                </Grid>
                            )}
                            rules={{ required: { value: true, message: '到期日為必填' } }}
                        />
                    </Grid>
                    <Grid container justifyContent={'space-between'}>
                        <Controller
                            control={control}
                            name='code'
                            render={({ field, fieldState: { invalid, error } }) => (
                                <Grid item sm={6} xs={12} sx={{ pr: { sm: 1, xs: 0 } }}>
                                    <InputLabel htmlFor='code'>優惠碼</InputLabel>
                                    <OutlinedInput
                                        error={invalid}
                                        type='text'
                                        id='code'
                                        size='small'
                                        fullWidth
                                        placeholder='請輸入優惠碼'
                                        {...field}
                                    />
                                    {invalid && <FormHelperText error>{error?.message}</FormHelperText>}
                                </Grid>
                            )}
                            rules={{ required: { value: true, message: '優惠碼為必填' } }}
                        />
                    </Grid>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button aria-label='close' variant='outlined' size='large' onClick={(e, reason) => handleClose(e, reason)}>
                    關閉
                </Button>
                <Button type='submit' aria-label='add' variant='contained' size='large' color='warning'>
                    儲存
                </Button>
            </DialogActions>
        </Dialog>
    );
};
