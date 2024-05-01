import {
    Box,
    Button,
    Divider,
    Paper,
    Stack,
    Table,
    TableContainer,
    TableHead,
    Typography,
    TableRow,
    TableCell,
    TableBody,
    Pagination,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import useProductService from '../../service/useProductService';

const AdminProduct = () => {
    const { getAllProducts } = useProductService();

    const getProducts = useCallback(async () => {
        const result = await getAllProducts();
        console.log(result);
    }, [getAllProducts]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handlePageChange = (event, value) => {
        console.log(event, value);
    };

    return (
        <Box p={2}>
            <Typography variant='h3' fontWeight={'bold'} mb={2}>
                產品列表
            </Typography>
            <Divider />
            <Stack direction={'row'} justifyContent={'flex-end'} my={2}>
                <Button
                    variant='contained'
                    color='warning'
                    sx={{ fontWeight: 'bold' }}
                >
                    建立新商品
                </Button>
            </Stack>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell width={'20%'}>
                                <Typography
                                    variant='subtitle1'
                                    fontWeight={'bold'}
                                >
                                    分類
                                </Typography>
                            </TableCell>
                            <TableCell width={'20%'}>
                                <Typography
                                    variant='subtitle1'
                                    fontWeight={'bold'}
                                >
                                    名稱
                                </Typography>
                            </TableCell>
                            <TableCell width={'20%'}>
                                <Typography
                                    variant='subtitle1'
                                    fontWeight={'bold'}
                                >
                                    售價
                                </Typography>
                            </TableCell>
                            <TableCell width={'20%'}>
                                <Typography
                                    variant='subtitle1'
                                    fontWeight={'bold'}
                                >
                                    啟用狀態
                                </Typography>
                            </TableCell>
                            <TableCell width={'20%'}>
                                <Typography
                                    variant='subtitle1'
                                    fontWeight={'bold'}
                                >
                                    編輯
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow hover>
                            <TableCell>分類</TableCell>
                            <TableCell>名稱</TableCell>
                            <TableCell>售價</TableCell>
                            <TableCell>啟用</TableCell>
                            <TableCell>
                                <Stack direction={'row'} spacing={1}>
                                    <Button
                                        variant='contained'
                                        color='warning'
                                        sx={{
                                            fontWeight: 'bold',
                                            boxShadow: 'none',
                                        }}
                                    >
                                        編輯
                                    </Button>
                                    <Button
                                        variant='outlined'
                                        color='error'
                                        sx={{ fontWeight: 'bold' }}
                                    >
                                        刪除
                                    </Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={10}
                color='warning'
                shape='rounded'
                sx={{ mt: 2 }}
                onChange={handlePageChange}
            />
        </Box>
    );
};

export default AdminProduct;
