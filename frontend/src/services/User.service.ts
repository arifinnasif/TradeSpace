import API from "../api/axios.config";

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
  sold_ads_count: number;
  active_ads_count: number;
}
