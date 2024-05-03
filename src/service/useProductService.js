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

    return { getAllProducts };
};

export default useProductService;
