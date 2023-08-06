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

class AdService {
  async getAdDetails<AdDetailsType>(id: number) {

    return (await API.get(`/ads/${id}`)).data;
    //   return {
    //     ad_id: 2,
    //     op_username: "johndoe",
    //     op_fullname: "John Doe",
    //     category_name: "Laptop",
    //     title: "Asus VivoBook S 15 " + id,
    //     description:
    //       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est delectus\
    // totam aliquid quis, culpa iste ratione esse ipsum hic sint possimus\
    // vitae aliquam perspiciatis consequuntur quibusdam ex accusantium\
    // suscipit recusandae adipisci dolor nulla? Voluptates est temporibus\
    // repellendus porro totam debitis excepturi sed, voluptatem numquam eum\
    // corporis mollitia soluta pariatur, modi dignissimos voluptatum ducimus\
    // rem, ipsum sit labore corrupti. Sequi ducimus accusamus laborum magni\
    // repudiandae pariatur, delectus aut voluptatum at vel quis, nisi\
    // laboriosam! Temporibus facere reiciendis officia ratione eos, illo error\
    // molestiae dicta. Facere, eaque nemo? Aspernatur dolor beatae\
    // perspiciatis repellat natus voluptatem, quos eum. Accusamus vero vel\
    // atque labore pariatur impedit sequi ad! Vel quos, architecto distinctio\
    // quasi, quae corrupti non omnis ipsam maxime consectetur, vitae sequi.\
    // Ipsa, esse.",
    //     price: 20000.0,
    //     days_used: {
    //       years: 2,
    //       months: 0,
    //       days: 2,
    //     },
    //     is_negotiable: true,
    //     is_sell_ad: true,
    //     phone: "+8801890123456",
    //     promotion_type: "normal",
    //     createdAt: "2023-06-12",
    //   };


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

  getAdDetails<AdDetailsType>(id: number) {
    // return API.get(`/products/${id}`);
    return {
      ad_id: 2,
      op_username: "johndoe",
      op_fullname: "John Doe",
      category_name: "Laptop",
      title: "Asus VivoBook S 15",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est delectus\
  totam aliquid quis, culpa iste ratione esse ipsum hic sint possimus\
  vitae aliquam perspiciatis consequuntur quibusdam ex accusantium\
  suscipit recusandae adipisci dolor nulla? Voluptates est temporibus\
  repellendus porro totam debitis excepturi sed, voluptatem numquam eum\
  corporis mollitia soluta pariatur, modi dignissimos voluptatum ducimus\
  rem, ipsum sit labore corrupti. Sequi ducimus accusamus laborum magni\
  repudiandae pariatur, delectus aut voluptatum at vel quis, nisi\
  laboriosam! Temporibus facere reiciendis officia ratione eos, illo error\
  molestiae dicta. Facere, eaque nemo? Aspernatur dolor beatae\
  perspiciatis repellat natus voluptatem, quos eum. Accusamus vero vel\
  atque labore pariatur impedit sequi ad! Vel quos, architecto distinctio\
  quasi, quae corrupti non omnis ipsam maxime consectetur, vitae sequi.\
  Ipsa, esse.",
      price: 20000.0,
      days_used: {
        years: 2,
        months: 0,
        days: 2,
      },
      is_negotiable: true,
      is_sell_ad: true,
      phone: "+8801890123456",
      promotion_type: "normal",
      createdAt: "2023-06-12",
    };
  }
}

export const adService = new AdService();
