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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useLoginService from '../../service/useLoginService';

const theme = createTheme({
    palette: {
        primary: {
            main: '#212529',
        },
    },
});

const DashBoard = () => {
    const navigator = useNavigate();

    const [isLogin, setIsLogin] = useState(false);

    const checkLoginRef = useRef(null);

    const { checkLogin } = useLoginService();

    // 以 checkLoginRef 紀錄 checkLogin，防止重複渲染
    if (!checkLoginRef.current) checkLoginRef.current = checkLogin;

    const checkLoginHandler = useCallback(async () => {
        console.log('checkLoginHandler');
        const result = await checkLoginRef.current();
        if (result.data && result.data.success) {
            setIsLogin(true);
        } else {
            alert('請重新登入');
            setIsLogin(false);
            navigator('/login');
        }
    }, [navigator]);

    useEffect(() => {
        checkLoginHandler();
    }, [checkLoginHandler]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    position='static'
                    color='primary'
                    sx={{ boxShadow: 'none' }}
                >
                    <Toolbar>
                        <Typography
                            variant='h6'
                            component='div'
                            sx={{ flexGrow: 1 }}
                        >
                            Uber Eat 後臺管理系統
                        </Typography>
                        <Button color='inherit'>登出</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Stack direction={'row'} minHeight={'calc(100vh - 64px)'}>
                <Box width={'300px'} bgcolor={'#f8f9fa'}>
                    <List>
                        <ListItem sx={{ bgcolor: '#fff' }}>
                            <ListItemButton>
                                <ListItemText primary='產品列表' />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem sx={{ bgcolor: '#fff' }}>
                            <ListItemButton>
                                <ListItemText primary='優惠卷列表' />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem sx={{ bgcolor: '#fff' }}>
                            <ListItemButton>
                                <ListItemText primary='訂單列表' />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </List>
                </Box>
                <Box flexGrow={1}>
                    {!isLogin ? (
                        <Backdrop open={!isLogin}>
                            <CircularProgress color='inherit' />
                        </Backdrop>
                    ) : (
                        <Outlet context={isLogin} />
                    )}
                </Box>
            </Stack>
        </ThemeProvider>
    );
};

export default DashBoard;
