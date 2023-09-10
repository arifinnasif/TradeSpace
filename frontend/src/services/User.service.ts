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

export interface declinedAdsType {
  id: number;
  op_username: string;
  title: string;
  description: string;
  price: number;
  image1: string;
  reason: string;
  address: string;
  created_at: string;
}

export interface TransactionType {
  trx_id: number;
  ad_id: number;
  promotion: string;
  amount: number;
  method: string;
  created_at: Date;
  ad_title: string;
  ad_image: string;
  ad_price: number;
  is_active_ad: boolean;
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

  async getUserPendingAds(): Promise<AdCardType[]> {
    const userPendingAds = (await API.get(`/profile/pending_ads`)).data;
    // console.log(userPendingAds);
    return userPendingAds;
  }

  async getUserDeclinedAds(): Promise<declinedAdsType[]> {
    const userDeclinedAds = (await API.get(`/profile/declined_ads`)).data;
    // console.log(userDeclinedAds);
    return userDeclinedAds;
  }

  async getUserTransactions(): Promise<TransactionType[]> {
    const userTransactions = (await API.get(`/profile/transactions`)).data;
    // console.log(userTransactions);
    return userTransactions;
  }
}

export const userService = new UserService();
