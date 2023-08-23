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
    return (
      await API.get(`/ads`, {
        params: {
          search: "car",
          // promo_types: ["promo1", "promo2"],
          // cat: ["cat1", "cat2"],
          // sort: "high-to-low",
          // geo: "lat:long",
          // ad_type: "sell",
          // page: 1,
          // limit: 10,
        },
      })
    ).data.ad_list;
  }

  async postAd(ad: any) {
    return (await API.post(`/ads`, ad)).data;
  }
}

export const adService = new AdService();
