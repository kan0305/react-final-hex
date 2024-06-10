import {
    AppBar,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Message } from '../../components/Message';
import useLoginService from '../../service/useLoginService';
import { setlogin } from '../../slice/loginSlice';

const CutomLink = styled(NavLink)({
    textDecoration: 'none',
    color: 'inherit',
    '&.active': {
        color: '#007bff',
    },
});

const theme = createTheme({
    palette: {
        primary: {
            main: '#212529',
        },
    },
});

const DashBoard = () => {
    const navigator = useNavigate();

    const dispatch = useDispatch();

    const { login } = useSelector((state) => state.login);

    const { loading } = useSelector((state) => state.loading);

    const loginService = useLoginService();

    const checkLoginRef = useRef();

    if (!checkLoginRef.current) checkLoginRef.current = loginService.checkLogin;

    const logoutHandler = async () => {
        const result = await loginService.logout();

        if (result.data && result.data.success) {
            alert('登出成功');
            navigator('/login');
        } else {
            alert('登出失敗');
        }
    };

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const result = await checkLoginRef.current();
                if (result.data && result.data.success) {
                    dispatch(setlogin(true));
                } else {
                    alert('請重新登入');
                    dispatch(setlogin(false));
                    navigator('/login');
                }
            } catch (error) {
                console.log(error);
                dispatch(setlogin(false));
                navigator('/login');
            }
        };
        checkLogin();
    }, [dispatch, navigator]);

    return (
        <ThemeProvider theme={theme}>
            <Message />
            <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
                <CircularProgress color='inherit' />
            </Backdrop>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static' color='primary' sx={{ boxShadow: 'none' }}>
                    <Toolbar>
                        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                            Uber Eat 後臺管理系統
                        </Typography>
                        <Button color='inherit' onClick={logoutHandler}>
                            登出
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Stack direction={'row'} minHeight={'calc(100vh - 64px)'}>
                <Box width={'300px'} bgcolor={'#f8f9fa'}>
                    <List>
                        <CutomLink to={'/admin/products'}>
                            <ListItem sx={{ bgcolor: '#fff' }}>
                                <ListItemButton>
                                    <ListItemText primary='產品列表' />
                                </ListItemButton>
                            </ListItem>
                        </CutomLink>
                        <Divider />
                        <CutomLink to={'/admin/coupons'}>
                            <ListItem sx={{ bgcolor: '#fff' }}>
                                <ListItemButton>
                                    <ListItemText primary='優惠卷列表' />
                                </ListItemButton>
                            </ListItem>
                        </CutomLink>
                        <Divider />
                        <CutomLink to={'/admin/orders'}>
                            <ListItem sx={{ bgcolor: '#fff' }}>
                                <ListItemButton>
                                    <ListItemText primary='訂單列表' />
                                </ListItemButton>
                            </ListItem>
                        </CutomLink>
                        <Divider />
                    </List>
                </Box>
                <Box flexGrow={1}>{login && <Outlet />}</Box>
            </Stack>
        </ThemeProvider>
    );
};

export default DashBoard;
