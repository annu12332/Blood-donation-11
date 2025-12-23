import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../provider/AuthProvider"; 
import { getAuth } from "firebase/auth";

const axiosSecure = axios.create({
    baseURL: 'https://blood-donation-backentd-11.vercel.app'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logout } = useAuth(); 
    const auth = getAuth();

    axiosSecure.interceptors.request.use(async function (config) {
        const user = auth.currentUser;
        if (user) {
            const token = await user.getIdToken();
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response?.status;
        
        if (status === 401 || status === 403) {
            await logout();
            navigate('/login');
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;