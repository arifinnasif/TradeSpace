import API from "../api/axios.config";

class RegistrationService {
    async register(userinfo: any) {
        return (await API.post(`/auth/register`, userinfo));
    }

    async verifyPhone(phone_otp_pair: any) {
        const response_status = (await API.post(`/auth/verify-phone`, phone_otp_pair)).status
        return response_status >= 200 && response_status < 300;
    }
}

export const registrationService = new RegistrationService();