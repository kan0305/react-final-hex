const API_PATH = process.env.REACT_APP_API_PATH;

const ROUTES = {
    //　登入與驗證
    ADMIN: {        
        LOGIN: "/v2/admin/signin",
        LOGOUT: "/v2/logout",
        CHECK: "/v2/api/user/check",
    },
    // 產品
    PRODUCTS: {
        ALL: `/v2/api/${API_PATH}/admin/products/all`,
        LIST: `/v2/api/${API_PATH}/admin/products`,
        ADD: `/v2/api/${API_PATH}/admin/product`,
    }
}

export default ROUTES;