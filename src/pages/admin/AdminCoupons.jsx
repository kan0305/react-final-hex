import React, { useEffect, useRef, useState } from 'react';
import {
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
    Typography,
    Backdrop,
} from '@mui/material';
import { MyPagination } from '../../components/MyPagination';
import useCouponService from '../../service/useCouponService';
import { DeleteModal } from '../../components/DeleteModal';
import { CouponModal } from '../../components/CouponModal';

export const AdminCoupons = () => {
    const [loading, setLoading] = useState(false);

    const [coupons, setCoupons] = useState([]);

    const [pagination, setPagination] = useState({});

    const [type, setType] = useState('create');

    const [tempCoupon, setTempCoupon] = useState({});

    const [openCouponModal, setOpenCouponModal] = useState(false);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const couponService = useCouponService();

    const getCouponsRef = useRef(null);

    const deleteCouponRef = useRef(null);

    if (!getCouponsRef.current) getCouponsRef.current = couponService.getCoupons;

    if (!deleteCouponRef.current) deleteCouponRef.current = couponService.deleteCoupon;

    const getCoupons = async (params = { page: 1 }) => {
        setLoading(true);
        try {
            const result = await getCouponsRef.current(params);
            if (result.data && result.data.success) {
                setCoupons(result.data.coupons);
                setPagination(result.data.pagination);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const result = await deleteCouponRef.current(tempCoupon.id);
        if (result.data && result.data.success) {
            getCoupons();
        } else {
            alert(result.data.message);
        }
    };

    const handlePageChange = (page) => {
        getCoupons({ page });
    };

    const handleOpenCouponModal = (type, tempCoupon) => {
        setOpenCouponModal(true);
        if (type === 'edit') {
            setType('edit');
            setTempCoupon(tempCoupon);
        } else if (type === 'create') {
            setType('create');
            setTempCoupon({});
        }
    };

    const handleOpenDeleteModal = (coupon) => {
        setOpenDeleteModal(true);
        setTempCoupon(coupon);
    };

    useEffect(() => {
        getCoupons();
    }, []);

    return (
        <React.Fragment>
            <CouponModal open={openCouponModal} setOpen={setOpenCouponModal} getCoupons={getCoupons} type={type} tempCoupon={tempCoupon} />
            <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} title={tempCoupon.title} handleDelete={handleDelete} />
            {loading && (
                <Backdrop open={loading}>
                    <CircularProgress color='inherit' />
                </Backdrop>
            )}
            {!loading && (
                <Box p={2}>
                    <Typography variant='h3' fontWeight={'bold'} mb={2}>
                        優惠券列表
                    </Typography>
                    <Divider />
                    <Stack direction={'row'} justifyContent={'flex-end'} my={2}>
                        <Button
                            variant='contained'
                            color='warning'
                            sx={{ fontWeight: 'bold' }}
                            onClick={() => handleOpenCouponModal('create')}
                        >
                            建立新優惠券
                        </Button>
                    </Stack>
                    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: 100 / 6 + '%' }}>
                                        <Typography variant='subtitle1' fontWeight={'bold'}>
                                            標題
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ width: 100 / 6 + '%' }}>
                                        <Typography variant='subtitle1' fontWeight={'bold'}>
                                            折扣
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ width: 100 / 6 + '%' }}>
                                        <Typography variant='subtitle1' fontWeight={'bold'}>
                                            到期日
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ width: 100 / 6 + '%' }}>
                                        <Typography variant='subtitle1' fontWeight={'bold'}>
                                            優惠碼
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ width: 100 / 6 + '%' }}>
                                        <Typography variant='subtitle1' fontWeight={'bold'}>
                                            啟用狀態
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ width: 100 / 6 + '%' }}>
                                        <Typography variant='subtitle1' fontWeight={'bold'}>
                                            編輯
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {coupons.map((coupon) => (
                                    <TableRow hover key={coupon.id}>
                                        <TableCell>{coupon.title}</TableCell>
                                        <TableCell>{coupon.percent}</TableCell>
                                        <TableCell>
                                            {`${new Date(coupon.due_date).getFullYear()}-${(new Date(coupon.due_date).getMonth() + 1)
                                                .toString()
                                                .padStart(2, '0')}-${new Date(coupon.due_date).getDate().toString().padStart(2, '0')}`}
                                        </TableCell>
                                        <TableCell>{coupon.code}</TableCell>
                                        <TableCell>{coupon.is_enabled ? '啟用' : '未啟用'}</TableCell>
                                        <TableCell>
                                            <Stack direction={'row'} spacing={1}>
                                                <Button
                                                    variant='contained'
                                                    color='warning'
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        boxShadow: 'none',
                                                    }}
                                                    onClick={() => handleOpenCouponModal('edit', coupon)}
                                                >
                                                    編輯
                                                </Button>
                                                <Button
                                                    variant='outlined'
                                                    color='error'
                                                    sx={{ fontWeight: 'bold' }}
                                                    onClick={() => handleOpenDeleteModal(coupon)}
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
                        <MyPagination count={pagination.total_pages} page={pagination.current_page} onChange={handlePageChange} />
                    )}
                </Box>
            )}
        </React.Fragment>
    );
};
