import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Create an axios instance
const baseRequest = axios.create({
    baseURL: API_URL,
});

// Request interceptor
baseRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers['Authorization'] = token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
baseRequest.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        // Handle errors        
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    localStorage.removeItem('token');
                    alert('請先登入');                    
                    window.location.href = '/login';
                    break;
                default:
                    break;
            }
        }

        return Promise.reject(error);
    }
);

const useHttp = () => {
    const get = (uri, config) => {
        return baseRequest.get(uri, config);
    };

    const post = (uri, data, config) => {
        return baseRequest.post(uri, data, config);
    };

    const put = (uri, data, config) => {
        return baseRequest.put(uri, data, config);
    };

    const del = (uri, config) => {
        return baseRequest.delete(uri, config);
    };

    return { get, post, put, del };
};

export default useHttp;
