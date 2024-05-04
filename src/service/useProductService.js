import useHttp from '../hook/useHttp';
import ROUTES from '../utils/route';

const useProductService = () => {
    const http = useHttp();

    const getAllProducts = async () => {
        try {
            const result = await http.get(ROUTES.PRODUCTS.LIST);
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
    }

    return { getAllProducts, addProduct };
};

export default useProductService;
