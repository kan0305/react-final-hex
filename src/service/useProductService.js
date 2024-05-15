import useHttp from '../hook/useHttp';
import ROUTES from '../utils/route';

const useProductService = () => {
    const http = useHttp();

    const getProducts = async (params = { page: 1 }) => {
        try {
            const result = await http.get(ROUTES.PRODUCTS.LIST, { params });
            return result;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    };

    const addProduct = async (data) => {
        try {
            const result = await http.post(ROUTES.PRODUCTS.ADD, data);
            return result;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    };

    const editProduct = async (productId, data) => {
        try {
            const result = await http.put(
                ROUTES.PRODUCTS.EDIT + productId,
                data
            );
            return result;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const result = await http.del(ROUTES.PRODUCTS.DELETE + productId);
            return result;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    };

    const uploadImage = async (data) => {
        try {
            const result = await http.post(ROUTES.PRODUCTS.IMAGE, data);
            return result;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    };

    return {
        getProducts,
        addProduct,
        editProduct,
        deleteProduct,
        uploadImage,
    };
};

export default useProductService;
