import {
    Box,
    Button,
    Divider,
    Pagination,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import useProductService from '../../service/useProductService';
import { ProductModal } from '../../components/ProductModal';

const AdminProduct = () => {
    const isLogin = useOutletContext();

    const [products, setProducts] = useState([]);

    const [pagination, setPagination] = useState({});

    const [openModal, setOpenModal] = useState(false);

    const [tempProduct, setTempProduct] = useState({});

    const [type, setType] = useState('');

    const productService = useProductService();

    const getAllProductsRef = useRef(null);

    // 以 getAllProductsRef 紀錄 getAllProducts，防止重複渲染
    if (!getAllProductsRef.current)
        getAllProductsRef.current = productService.getAllProducts;

    const getAllProducts = getAllProductsRef.current;

    const getProducts = useCallback(async () => {
        const result = await getAllProducts();

        if (result.data && result.data.success) {
            setProducts(result.data.products);
            setPagination(result.data.pagination);
        }
    }, [getAllProducts]);

    useEffect(() => {
        if (isLogin) {
            getProducts();
        }
    }, [isLogin, getProducts]);

    const handlePageChange = (event, value) => {
        console.log(event, value);
    };

    const handleOpenModal = (type, tempProduct) => {
        setOpenModal(true);

        if (type === 'edit') {
            setType('edit');
            setTempProduct(tempProduct);
        } else if (type === 'create') {
            setType('create');
            setTempProduct({});
        }
    };

    return (
        <Box p={2}>
            <ProductModal
                open={openModal}
                setOpen={setOpenModal}
                getProducts={getProducts}
                type={type}
                tempProduct={tempProduct}
            />
            <Typography variant='h3' fontWeight={'bold'} mb={2}>
                產品列表
            </Typography>
            <Divider />
            <Stack direction={'row'} justifyContent={'flex-end'} my={2}>
                <Button
                    variant='contained'
                    color='warning'
                    sx={{ fontWeight: 'bold' }}
                    onClick={() => handleOpenModal('create', {})}
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
                        {products.map((product) => (
                            <TableRow hover key={product.id}>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                    {product.is_enabled ? '啟用' : '未啟用'}
                                </TableCell>
                                <TableCell>
                                    <Stack direction={'row'} spacing={1}>
                                        <Button
                                            variant='contained'
                                            color='warning'
                                            sx={{
                                                fontWeight: 'bold',
                                                boxShadow: 'none',
                                            }}
                                            onClick={() =>
                                                handleOpenModal('edit', product)
                                            }
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
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {pagination && pagination.total_pages > 0 && (
                <Pagination
                    count={pagination.total_pages}
                    color='warning'
                    shape='rounded'
                    sx={{ mt: 2 }}
                    onChange={handlePageChange}
                />
            )}
        </Box>
    );
};

export default AdminProduct;
