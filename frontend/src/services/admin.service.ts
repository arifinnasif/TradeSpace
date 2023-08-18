import API from "../api/axios.config";

export const login = async (userinfo: any) => {
    const response = await API.post(`/admin/login`, userinfo, {
        withCredentials: true,
    });

    console.log(response.data);

    return response;
};

export const getAdReviews = async () => {
    return (await API.get(`/admin/ad_reviews`, {
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
