import Stripe from "stripe";
import * as dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
});

const store_items = new Map([
    [1, { priceInCents: 10000, name: "Apple" }],
    [2, { priceInCents: 20000, name: "Banana" }],
]);

const create_checkout_session = async () => {
    try {
        const id = 1;
        // const domain_url = process.env.WEB_APP_URL!;
        const { priceInCents, name } = store_items.get(Number(id));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "bdt",
                        product_data: {
                            name: name,
                        },
                        unit_amount: priceInCents,
                    },
                    quantity: 1,
                },
            ],
            success_url: `https://google.com`,
            cancel_url: `https://bing.com`,
        });

        console.log(session);
    } catch (error: any) {
        // return res.status(500).json({
        //     success: false,
        //     error: error.message
        // });
        console.log(error);
    }
}

create_checkout_session();