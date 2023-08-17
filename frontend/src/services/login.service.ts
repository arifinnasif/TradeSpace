import API from "../api/axios.config";

const login = async (userinfo: any) => {
  const response = await API.post(`/auth/login`, userinfo, {
    withCredentials: true,
  });

  console.log(response.data);

  // document.cookie = `token=${response.data.token}; path=/;`;

  return response;
};

export default login;
