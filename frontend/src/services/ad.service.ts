import API from "../api/axios.config";

export interface AdDetailsType {
  ad_id: number;
  op_username: string;
  op_fullname: string;
  category_name: string;
  title: string;
  description?: string;
  price?: number;
  is_negotiable: boolean;
  is_sell_ad: boolean;
  days_used?: {
    years: number;
    months: number;
    days: number;
  };
  phone?: string;
  promotion_type?: string;
  createdAt: string;
}

export interface AdCardType {
  id: string;
  title: string;
  category_name: string;
  price: string;
  is_used: boolean;
  is_negotiable: boolean;
  is_sell_ad: boolean;
  promotion_type: string;
}

class AdService {
  async getAdDetails<AdDetailsType>(id: number) {
    return (await API.get(`/ads/${id}`)).data;
  }

  async getAds() {
    console.log((await API.get(`/ads`)).data.ad_list);
    return (await API.get(`/ads`)).data.ad_list;
  }
}

export const adService = new AdService();
