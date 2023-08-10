import API from "../api/axios.config";

class LoginService {
  async login(userinfo: any) {
    return await API.post(`/auth/login`, userinfo, {
      withCredentials: true,
    });
  }
}

export const loginService = new LoginService();
