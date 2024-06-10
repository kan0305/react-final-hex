import useHttp from '../hook/useHttp';

const useLoginService = () => {
    const http = useHttp();

    const checkLogin = async () => {
        return http.checkLogin();
    };

    const login = async (data) => {
        return http.login(data);
    };

    const logout = async () => {
        return http.logout();
    };

    return { checkLogin, login, logout };
};

export default useLoginService;
