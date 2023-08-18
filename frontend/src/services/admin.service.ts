import API from "../api/axios.config";

export const login = async (userinfo: any) => {
    const response = await API.post(`/admin/login`, userinfo, {
        withCredentials: true,
    });

    console.log(response.data);

    return response;
};

export const getAdReviews = async () => {
    console.log((await API.get(`/admin/ad_reviews`)).data);
    return (await API.get(`/admin/ad_reviews`, {
        withCredentials: true,
    })).data;
}

export const approve_a_review = async (review_id: number) => {
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
