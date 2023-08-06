export interface AdDetailsType {
  ad_id: number
  op_username: string,
  op_fullname: string,
  category_name: string,
  title: string,
  description?: string,
  price?: number,
  is_negotiable: boolean,
  is_sell_ad: boolean,
  days_used?:  {
    years: number,
    months: number,
    days: number,
  },
  phone?: string,
  promotion_type?: string,
  createdAt: string,
}

class AdService {
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
