import { useDispatch } from 'react-redux';
import { setLoading } from '../slice/loadingSlice';
import { setMessage } from '../slice/messageSlice';
import useAxiosInterceptor from './useAxiosInteceptor';
import ROUTE from '../utils/route';

const useHttp = () => {
    const { baseRequest } = useAxiosInterceptor();

    const dispatch = useDispatch();

    const get = async (uri, config = {}) => {
        return await myFetch('get', uri, config);
    };

    const post = async (uri, data, config = {}) => {
        return await myFetch('post', uri, data, config);
    };

    const put = async (uri, data, config = {}) => {
        return await myFetch('put', uri, data, config);
    };

    const del = async (uri, config) => {
        return await myFetch('delete', uri, config);
    };

    const myFetch = async (method, uri, data = new FormData(), config = {}) => {
        isLoading(true);
        try {
            let result;
            if (method === 'post' || method === 'put') {
                result = await baseRequest[method](uri, data, config);
            } else {
                result = await baseRequest[method](uri, config);
            }
            alertMessage({ type: 'success', message: '執行成功' });
            return result;
        } catch (error) {
            console.log(error);
            alertMessage({ type: 'error', message: '執行失敗' });
            return error.response;
        } finally {
            isLoading(false);
        }
    };

    const checkLogin = async () => {
        console.log('checkLogin');
        try {
            const result = await baseRequest.post(ROUTE.ADMIN.CHECK);
            return result;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    };

    const login = async (data) => {
        console.log('login');
        try {
            const result = await baseRequest.post(ROUTE.ADMIN.LOGIN, data);
            return result;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    };

    const logout = async () => {
        try {
            const result = await baseRequest.post(ROUTE.ADMIN.LOGOUT);
            return result;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    };

    const isLoading = (loading) => {
        dispatch(setLoading(loading));
    };

    const alertMessage = (message) => {
        dispatch(setMessage(message));
    };

    return { get, post, put, del, checkLogin, login, logout };
};

export default useHttp;
