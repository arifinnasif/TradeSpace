import API from "../api/axios.config";
import { AdCardType } from "./ad.service";

export interface userProfileType {
  username: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  profile_pic: string;
  created_at: string;
  posted_ads_count: number;
  pending_ads_count: number;
  active_ads_count: number;
  declined_ads_count: number;
}

class UserService {
  async getUserInfo(): Promise<userProfileType> {
    const userInfo = (await API.get(`/profile`)).data;
    // console.log(userInfo);
    return userInfo;
  }

  async getUserOwnAds(): Promise<AdCardType[]> {
    const userOwnAds = (await API.get(`/profile/my_ads`)).data;
    // console.log(userOwnAds);
    return userOwnAds;
  }
}

export const userService = new UserService();
