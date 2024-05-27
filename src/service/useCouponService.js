import useHttp from '../hook/useHttp';
import ROUTES from '../utils/route';

const useCouponService = () => {
    const http = useHttp();

    const getCoupons = async (params = { page: 1 }) => {
        try {
            const result = await http.get(ROUTES.COUPONS.LIST, { params });
            return result;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    };

    const addCoupon = async (data) => {
        try {
            const result = await http.post(ROUTES.COUPONS.ADD, data);
            return result;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    };

    const editCoupon = async (couponId, data) => {
        try {
            const result = await http.put(ROUTES.COUPONS.EDIT + couponId, data);
            return result;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    };

    const deleteCoupon = async (couponId) => {
        try {
            const result = await http.del(ROUTES.COUPONS.DELETE + couponId);
            return result;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    };

    return { getCoupons, addCoupon, editCoupon, deleteCoupon };
};

export default useCouponService;
