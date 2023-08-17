import API from "../api/axios.config";

export const login = async (userinfo: any) => {
    const response = await API.post(`/admin/login`, userinfo, {
        withCredentials: true,
    });

    console.log(response.data);

    return response;
};
