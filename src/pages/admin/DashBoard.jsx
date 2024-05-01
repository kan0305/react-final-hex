import {
    AppBar,
    Box,
    Button,
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
import React from 'react';
import { Outlet } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#212529',
        },
    },
});

const DashBoard = () => {
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
                    <Outlet />
                </Box>
            </Stack>
        </ThemeProvider>
    );
};

export default DashBoard;
