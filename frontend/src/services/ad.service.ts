import API from "../api/axios.config";

export interface AdDetailsType {
  ad_id: number;
  op_username: string;
  op_fullname: string;
  category_name: string;
  title: string;
  description?: string;
  image1: string;
  price?: number;
  is_negotiable: boolean;
  is_sell_ad: boolean;
  is_used: boolean;
  days_used?: {
    years: number;
    months: number;
    days: number;
  };
  phone?: string;
  op_email: string;
  promotion_type?: string;
  created_at: string;
  address?: {
    description: string;
    latitude: number;
    longitude: number;
  };
  handleChatClick: () => void;
}

export interface AdCardType {
  id: string;
  title: string;
  category_name: string;
  price: string;
  image1: string;
  is_used: boolean;
  is_negotiable: boolean;
  is_sell_ad: boolean;
  promotion_type: string;
  width?: string;
}

class AdService {

  async getAdDetails(id: number): Promise<AdDetailsType> {
    return (await API.get(`/ads/${id}`)).data;
  }

  async getAds(params: URLSearchParams) {
    // console.log((await API.get(`/ads`)).data.ad_list);
    // console.log(search_string.getAll("cat"));
    const search_term = params.get("search_string");
    const response = (
      await API.get(`/ads`, {
        params: params,
        // params: {
        //   search_string: search_term,
        //   // promo_types: ["promo1", "promo2"],
        //   // cat: ["cat1", "cat2"],
        //   // sort: "high-to-low",
        //   // geo: "lat:long",
        //   // ad_type: "sell",
        //   // page: 1,
        //   // limit: 10,
        // },
      })
    ).data.ad_list;
    console.log(response);
    return response;
  }

  async postAd(ad: any) {
    return (await API.post(`/ads`, ad)).data;
  }
}

export const adService = new AdService();
