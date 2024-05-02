import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    InputLabel,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useLoginService from '../service/useLoginService';

const Login = () => {
    const navigator = useNavigate();

    const { register, handleSubmit, watch } = useForm();

    const { login } = useLoginService();

    const [isLoading, setIsLoading] = useState(false);

    const [loginState, setLoginState] = useState({});

    const loginHandler = async (formData) => {
        setIsLoading(true);

        const result = await login(formData);

        if (result.data && result.data.success) {
            navigator('/admin/products');
        } else {
            setLoginState(result.data);
        }

        setIsLoading(false);
    };

    const onSubmit = (formData) => {
        loginHandler(formData);
    };

    const isEmptyObject = (obj) => {
        return (
            obj && Object.keys(obj).length === 0 && obj.constructor === Object
        );
    };

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (!isEmptyObject(loginState)) {
                setLoginState({});
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, loginState]);

    return (
        <Container maxWidth={'lg'} sx={{ py: '5rem' }}>
            <Grid container justifyContent={'center'}>
                <Grid item md={6}>
                    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                        <Typography
                            variant='h3'
                            align='left'
                            fontWeight={'bold'}
                            mb={2}
                        >
                            登入帳號
                        </Typography>
                        {loginState.message && !loginState.success && (
                            <Alert severity='error'>
                                {loginState.message
                                    ? loginState.message
                                    : '登入失敗'}
                            </Alert>
                        )}
                        <Stack direction={'column'} alignItems={'left'} mb={2}>
                            <InputLabel htmlFor='email'>Email</InputLabel>
                            <TextField
                                id='email'
                                type='email'
                                size='small'
                                placeholder='Email'
                                fullWidth
                                {...register('username', {
                                    required: true,
                                })}
                            />
                        </Stack>
                        <Stack direction={'column'} alignItems={'left'} mb={2}>
                            <InputLabel htmlFor='password'>密碼</InputLabel>
                            <TextField
                                id='password'
                                type='password'
                                size='small'
                                placeholder='Password'
                                fullWidth
                                {...register('password', {
                                    required: true,
                                })}
                            />
                        </Stack>
                        <Box position={'relative'}>
                            <Button
                                variant='contained'
                                type='submit'
                                disabled={isLoading}
                            >
                                登入
                                {isLoading && (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: 'primary',
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginTop: '-12px',
                                            marginLeft: '-12px',
                                        }}
                                    />
                                )}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
