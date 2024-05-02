import useHttp from '../hook/useHttp';
import ROUTE from '../utils/route';

const useLoginService = () => {
    const http = useHttp();

    const checkLogin = async () => {
        console.log('checkLogin');
        try {
            const result = await http.post(ROUTE.ADMIN.CHECK);
            return result;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    };

    const login = async (data) => {
        try {
            const result = await http.post(ROUTE.ADMIN.LOGIN, data);

            if (result.data.success) {
                localStorage.setItem('token', result.data.token);
            }

            return result;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    };

    return { checkLogin, login };
};

export default useLoginService;
