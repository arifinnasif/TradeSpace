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
  category: string;
  price: string;
  is_used: boolean;
  is_negotiable: boolean;
  is_sell_ad: boolean;
}

class AdService {
  async getAdDetails<AdDetailsType>(id: number) {

    return (await API.get(`/ads/${id}`)).data;

  }




  getAds() {
    // return API.get("/ads");
    return [
      {
        id: "1",
        title: "React tshirt",
        category: "Category",
        price: "$23.00",
        is_used: true,
        is_negotiable: false,
        is_sell_ad: false,
      },
      {
        id: "2",
        title: "chakraUI mug",
        category: "category",
        price: "$15.00",
        is_used: true,
        is_negotiable: true,
        is_sell_ad: true,
      },
      {
        id: "3",
        title: "black tshirt",
        category: "category",
        price: "$10.25",
        is_used: false,
        is_negotiable: true,
        is_sell_ad: false,
      },
      {
        id: "4",
        title: "react tshirt",
        category: "category",
        price: "$23.00",
        is_used: true,
        is_negotiable: true,
        is_sell_ad: false,
      },
      {
        id: "5",
        title: "chakraUI mug",
        category: "category",
        price: "$15.00",
        is_used: false,
        is_negotiable: true,
        is_sell_ad: true,
      },
      {
        id: "6",
        title: "black tshirt",
        category: "category",
        price: "$10.25",
        is_used: true,
        is_negotiable: false,
        is_sell_ad: false,
      },
    ];
  }


}

export const adService = new AdService();
