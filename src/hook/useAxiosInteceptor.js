import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

// Create an axios instance
const baseRequest = axios.create({
    baseURL: API_URL,
});

const useAxiosInterceptor = () => {
    const navigator = useNavigate();

    const token = localStorage.getItem('token');

    // Request Success interceptor
    const reqResInterceptor = useCallback(
        (config) => {
            if (token) {
                config.headers['Authorization'] = token;
            }

            return config;
        },
        [token]
    );

    // Request Error interceptor
    const reqErrInterceptor = useCallback(
        async (error) => Promise.reject(error),
        []
    );

    // Response Success interceptor
    const resResInterceptor = useCallback(async (response) => {
        // Handle successful responses as needed
        return response;
    }, []);

    // Response Error interceptor
    const resErrInterceptor = useCallback(
        async (error) => {
            // Handle error responses as needed
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        alert('請先登入');
                        navigator('/login');
                        break;
                    default:
                        break;
                }
            }

            return Promise.reject(error);
        },
        [navigator]
    );

    useEffect(() => {
        const reqInteceptor = baseRequest.interceptors.request.use(
            reqResInterceptor,
            reqErrInterceptor
        );
        const resInteceptor = baseRequest.interceptors.response.use(
            resResInterceptor,
            resErrInterceptor
        );

        return () => {
            baseRequest.interceptors.request.eject(reqInteceptor);
            baseRequest.interceptors.response.eject(resInteceptor);
        };
    }, [
        token,
        reqResInterceptor,
        reqErrInterceptor,
        resResInterceptor,
        resErrInterceptor,
    ]);

    return { baseRequest };
};

export default useAxiosInterceptor;
