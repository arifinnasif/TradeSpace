import API from "../api/axios.config";

export interface PromotionType {
    promotion_type: string;
    description: string;
    cost: number;
    validity_days: number;
    ticket: number;
}


export const get_promotions = async () => {
    const response = await API.get(`/promotions/`, {
        withCredentials: true,
    });

    console.log(response.data);

    return response;
};