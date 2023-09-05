import API from "../api/axios.config";

export interface ReviewCardType {
    id: string;
    title: string;
    category_name: string;
    price: string;
    is_used: boolean;
    is_negotiable: boolean;
    is_sell_ad: boolean;
    promotion_type: string;
    image1: string;
    is_ai_approved: boolean;
    ai_verdict: string;
    refreshAction: () => void;
}


export const login = async (userinfo: any) => {
    const response = await API.post(`/admin/login`, userinfo, {
        withCredentials: true,
    });

    console.log(response.data);

    return response;
};

export const getAdReviews = async (page?: number) => {
    return (await API.get(`/admin/ad_reviews?page=${page}`, {
        withCredentials: true,
    })).data;
}

export const approveAReview = async (review_id: number) => {
    const response = await API.put(
        `/admin/ad_reviews/${review_id}`,
        {},
        {
            withCredentials: true,
        }


    );

    console.log(response.data);

    return response;
}

export const declineAReview = async (review_id: number, body: any) => {
    const response = await API.delete(
        `/admin/ad_reviews/${review_id}`,
        {
            data: body,
            withCredentials: true,
        }
    );

    console.log(response.data);

    return response;
}
