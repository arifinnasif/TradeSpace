import stripe from "./stripe";
import _ from "lodash";



export const create_checkout_session = async (promotion_type: string, price: number) => {
    try {


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "bdt",
                        product_data: {
                            name: _.startCase(promotion_type),
                        },
                        unit_amount: Math.round(price * 100),
                    },
                    quantity: 1,
                },
            ],
            success_url: process.env.STRIPE_UPON_SUCCESS_URL!,
            cancel_url: process.env.STRIPE_UPON_CANCEL_URL!,
        });

        console.log("printing from create checkout session");
        console.log(session);
        return [session.id, session.url, session.payment_intent];
    } catch (error: any) {
        // return res.status(500).json({
        //     success: false,
        //     error: error.message
        // });
        console.log(error);
    }
}