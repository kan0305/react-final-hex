import useHttp from '../hook/useHttp';
import ROUTE from '../utils/route';

const useLoginService = () => {
    const http = useHttp();

    const login = async (data) => {
        try {
            const result = await http.post(ROUTE.ADMIN.LOGIN, data);

            if (result.data.success) {
                localStorage.setItem('token', result.data.token);
            }

            return result;
        } catch (error) {
            console.log(error);
        }
    };

    return { login };
};

export default useLoginService;
