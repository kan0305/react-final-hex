import useAxiosInterceptor from './useAxiosInteceptor';

const useHttp = () => {
    const { baseRequest } = useAxiosInterceptor();

    const get = async (uri, config) => {
        return await baseRequest.get(uri, config);
    };

    const post = async (uri, data, config) => {
        return await baseRequest.post(uri, data, config);
    };

    const put = async (uri, data, config) => {
        return await baseRequest.put(uri, data, config);
    };

    const del = async (uri, config) => {
        return await baseRequest.delete(uri, config);
    };

    return { get, post, put, del };
};

export default useHttp;
