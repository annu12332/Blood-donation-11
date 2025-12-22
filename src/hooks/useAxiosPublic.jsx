import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://blood-donation-backentd-11.vercel.app/' 
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;