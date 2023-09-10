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
    ai_verdict: any;
    refreshAction: () => void;
}

export interface ReviewDetailsType {
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
    ai_verdict: any;
}


export interface TransactionType {
    trx_id: number;
    stripe_checkout_id: string;
    stripe_payment_intent: string;
    username: string;
    ad_id: number;
    promotion: string;
    amount: number;
    method: string;
    status: string;
    receipt_url: string;
    created_at: Date;
}


export interface UserType {
    username: string;
    age: number;
    gender: string;
    is_muted: boolean;
    created_at: Date;
    approved_ads: number;
    pending_ads: number;
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

export const getAnAdReview = async (ad_id: number): Promise<ReviewDetailsType> => {
    return (await API.get(`/admin/ad_reviews/${ad_id}`, {
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

export const getTransactions = async (): Promise<TransactionType[]> => {
    return (await API.get(`/admin/transactions`, {
        withCredentials: true,
    })).data;
}

export const getAllUsers = async (): Promise<UserType[]> => {
    return (await API.get(`/admin/users`, {
        withCredentials: true,
    })).data;
}


export const muteAUser = async (username: string, body: any) => {
    const response = await API.put(
        `/admin/mute_user/${username}`,
        body,
        {
            withCredentials: true,
        }
    );

    console.log("mute user admin service", response.data);

    return response;
}
