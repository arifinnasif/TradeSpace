import { Cookies } from "react-cookie";
import API from "../api/axios.config";

export interface CategoryType {
  name: string;
  ads_count: string;
}

class HomeService {
  async getCategories<CategoryType>() {
    // return API.get("/cats");
    console.log(await API.get(`/home/categories`));
    return (await API.get(`/home/categories`)).data.categories_with_ads_count;
    // return [
    //   {
    //     category: "Mobile",
    //     count: "23",
    //   },
    //   {
    //     category: "Vehicles",
    //     count: "15",
    //   },
    //   {
    //     category: "Electronics",
    //     count: "10",
    //   },
    //   {
    //     category: "Bikes",
    //     count: "23",
    //   },
    //   {
    //     category: "Property for Sale",
    //     count: "15",
    //   },
    //   {
    //     category: "Property for Rent",
    //     count: "10",
    //   },
    //   {
    //     category: "Jobs",
    //     count: "23",
    //   },
    //   {
    //     category: "Services",
    //     count: "15",
    //   },
    //   {
    //     category: "Mobile",
    //     count: "23",
    //   },
    //   {
    //     category: "Vehicles",
    //     count: "15",
    //   },
    //   {
    //     category: "Electronics",
    //     count: "10",
    //   },
    //   {
    //     category: "Bikes",
    //     count: "23",
    //   },
    //   {
    //     category: "Property for Sale",
    //     count: "15",
    //   },
    //   {
    //     category: "Property for Rent",
    //     count: "10",
    //   },
    //   {
    //     category: "Jobs",
    //     count: "23",
    //   },
    //   {
    //     category: "Services",
    //     count: "15",
    //   },
    // ];
  }

  async protectedInfo() {
    console.log(new Cookies().get("token"));
    return await API.get("/auth/protected");
  }
}

export const homeService = new HomeService();
