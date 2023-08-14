import API from "../api/axios.config";

class LoginService {
  async login(userinfo: any) {
    const response = await API.post(`/auth/login`, userinfo, {
      withCredentials: true,
    });

    document.cookie = `token=${response.data.cookies.token}; path=/;`;

    return response;
  }
}

export const loginService = new LoginService();
