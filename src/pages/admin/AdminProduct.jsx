import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Divider,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { DeleteModal } from '../../components/DeleteModal';
import { MyPagination } from '../../components/MyPagination';
import { ProductModal } from '../../components/ProductModal';
import useProductService from '../../service/useProductService';

const AdminProduct = () => {
    const isLogin = useOutletContext();

    const [isLoading, setIsLoading] = useState(false);

    const [products, setProducts] = useState([]);

    const [pagination, setPagination] = useState({});

    const [openProductModal, setOpenProductModal] = useState(false);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [tempProduct, setTempProduct] = useState({});

    const [type, setType] = useState('');

    const productService = useProductService();

    const getProductsRef = useRef(null);

    const deleteProductRef = useRef(null);

    // 以 getProductsRef 紀錄 getProducts，防止重複渲染
    if (!getProductsRef.current)
        getProductsRef.current = productService.getProducts;

    // 以 deleteProductRef 紀錄 deleteProduct，防止重複渲染
    if (!deleteProductRef.current)
        deleteProductRef.current = productService.deleteProduct;

    const getProducts = getProductsRef.current;

    const deleteProduct = deleteProductRef.current;

    const getProductsHandler = useCallback(
        async (params) => {
            console.log(params);
            setIsLoading(true);

            const result = await getProducts(params);

            if (result.data && result.data.success) {
                setProducts(result.data.products);
                setPagination(result.data.pagination);
            }

            setIsLoading(false);
        },
        [getProducts]
    );

    const deleteProductHandler = async (productId) => {
        const result = await deleteProduct(productId);

        if (result.data.success) {
            getProductsHandler();
        } else {
            alert(result.data.message);
        }
    };

    useEffect(() => {
        if (isLogin) {
            getProductsHandler();
        }
    }, [isLogin, getProductsHandler]);

    const handlePageChange = async (event, value) => {
        console.log(event, value);
        getProductsHandler({ page: value });
    };

    const handleOpenProductModal = (type, tempProduct) => {
        setOpenProductModal(true);

        if (type === 'edit') {
            setType('edit');
            setTempProduct(tempProduct);
        } else if (type === 'create') {
            setType('create');
            setTempProduct({});
        }
    };

    const handleOpenDeleteModal = (tempProduct) => {
        setOpenDeleteModal(true);
        setTempProduct(tempProduct);
    };

    return (
        <React.Fragment>
            <ProductModal
                open={openProductModal}
                setOpen={setOpenProductModal}
                getProducts={getProductsHandler}
                type={type}
                tempProduct={tempProduct}
            />
            <DeleteModal
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
                title={tempProduct.title}
                handleDelete={() => deleteProductHandler(tempProduct.id)}
            />
            {isLoading && (
                <Backdrop open={isLoading}>
                    <CircularProgress color='inherit' />
                </Backdrop>
            )}
            {!isLoading && (
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
                            onClick={() => handleOpenProductModal('create', {})}
                        >
                            建立新商品
                        </Button>
                    </Stack>
                    <TableContainer
                        component={Paper}
                        sx={{ boxShadow: 'none' }}
                    >
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
                                        <TableCell>
                                            {product.category}
                                        </TableCell>
                                        <TableCell>{product.title}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>
                                            {product.is_enabled
                                                ? '啟用'
                                                : '未啟用'}
                                        </TableCell>
                                        <TableCell>
                                            <Stack
                                                direction={'row'}
                                                spacing={1}
                                            >
                                                <Button
                                                    variant='contained'
                                                    color='warning'
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        boxShadow: 'none',
                                                    }}
                                                    onClick={() =>
                                                        handleOpenProductModal(
                                                            'edit',
                                                            product
                                                        )
                                                    }
                                                >
                                                    編輯
                                                </Button>
                                                <Button
                                                    variant='outlined'
                                                    color='error'
                                                    sx={{ fontWeight: 'bold' }}
                                                    onClick={() =>
                                                        handleOpenDeleteModal(
                                                            product
                                                        )
                                                    }
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
                        <MyPagination
                            count={pagination.total_pages}
                            page={pagination.current_page}
                            onChange={handlePageChange}
                        />
                    )}
                </Box>
            )}
        </React.Fragment>
    );
};

export default AdminProduct;
