import { Container, Grid, Alert, Typography, TextField, Stack, Button, InputLabel, Box } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Container maxWidth={'lg'} sx={{ py: "5rem" }}>
            <Grid container justifyContent={'center'}>
                <Grid item md={6}>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant='h3' align='left' fontWeight={'bold'} mb={2}>登入帳號</Typography>
                        <Alert severity="error" sx={{ mb: 2 }}>錯誤訊息</Alert>
                        <Stack direction={'column'} alignItems={'left'} mb={2}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <TextField id='email' type='email' size='small' placeholder='Email' fullWidth {...register('email', { required: true })} />
                        </Stack>
                        <Stack direction={'column'} alignItems={'left'} mb={2}>
                            <InputLabel htmlFor="password">密碼</InputLabel>
                            <TextField id='password' type='password' size='small' placeholder='Password' fullWidth {...register('password', { required: true })} />
                        </Stack>
                        <Button variant="contained" type='submit'>登入</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login