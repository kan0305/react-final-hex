const API_PATH = process.env.REACT_APP_API_PATH;

const ROUTES = {
    //　登入與驗證
    ADMIN: {
        LOGIN: '/v2/admin/signin',
        LOGOUT: '/v2/logout',
        CHECK: '/v2/api/user/check',
    },
    // 產品
    PRODUCTS: {
        ALL: `/v2/api/${API_PATH}/admin/products/all`,
        LIST: `/v2/api/${API_PATH}/admin/products`,
        ADD: `/v2/api/${API_PATH}/admin/product`,
        EDIT: `/v2/api/${API_PATH}/admin/product/`,
        DELETE: `/v2/api/${API_PATH}/admin/product/`,
        IMAGE: `/v2/api/${API_PATH}/admin/upload`,
    },
    // Coupon
    COUPONS: {
        LIST: `/v2/api/${API_PATH}/admin/coupons`,
        ADD: `/v2/api/${API_PATH}/admin/coupon`,
        EDIT: `/v2/api/${API_PATH}/admin/coupon/`,
        DELETE: `/v2/api/${API_PATH}/admin/coupon/`,
    },
};

export default ROUTES;
