import API from "../api/axios.config";

export interface PromotionType {
    promotion_type: string;
    description: string;
    cost: number;
    validity_days: number;
    ticket: number;
}


export const getPromotions = async () => {
    const response = await API.get(`/promotions/`, {
        withCredentials: true,
    });

    console.log(response.data);

    return response.data;
};


export const promoteAd = async (ad_id: number, promotion_type: string) => {
    const response = await API.put(`/ads/${ad_id}/`, { promotion_type: promotion_type }, {
        withCredentials: true,
    });

    console.log(response.data);

    return response.data;
};