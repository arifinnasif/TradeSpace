import API from "../api/axios.config";

export interface CategoryType {
  category: string;
  count: string;
}

class HomeService {
  getCategories() {
    // return API.get("/cats");
    return [
      {
        category: "Mobile",
        count: "23",
      },
      {
        category: "Vehicles",
        count: "15",
      },
      {
        category: "Electronics",
        count: "10",
      },
      {
        category: "Bikes",
        count: "23",
      },
      {
        category: "Property for Sale",
        count: "15",
      },
      {
        category: "Property for Rent",
        count: "10",
      },
      {
        category: "Jobs",
        count: "23",
      },
      {
        category: "Services",
        count: "15",
      },
      {
        category: "Mobile",
        count: "23",
      },
      {
        category: "Vehicles",
        count: "15",
      },
      {
        category: "Electronics",
        count: "10",
      },
      {
        category: "Bikes",
        count: "23",
      },
      {
        category: "Property for Sale",
        count: "15",
      },
      {
        category: "Property for Rent",
        count: "10",
      },
      {
        category: "Jobs",
        count: "23",
      },
      {
        category: "Services",
        count: "15",
      },
    ];
  }

  async protectedInfo() {
    return await API.get("/auth/protected");
  }
}

export const homeService = new HomeService();
