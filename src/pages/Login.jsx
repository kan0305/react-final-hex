import {
    Alert,
    Box,
    Button,
    Container,
    Grid,
    InputLabel,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useLoginService from '../service/useLoginService';

const Login = () => {
    const navigator = useNavigate();

    const { login } = useLoginService();

    const { register, handleSubmit } = useForm();

    const [loginState, setLoginState] = useState({});

    const loginHandler = async (formData) => {
        try {
            const result = await login(formData);

            if (result.data.success) {
                navigator('/admin/dashboard/products');
            }

        } catch (error) {
            setLoginState(error.response.data);
        }
    };

    const onSubmit = (formData) => {
        loginHandler(formData);
    };

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
                                {...register('username', { required: true })}
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
                                {...register('password', { required: true })}
                            />
                        </Stack>
                        <Button variant='contained' type='submit'>
                            登入
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
