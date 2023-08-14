import Stripe from "stripe";
import * as dotenv from "dotenv";

dotenv.config();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
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


const create_charges = async () => {
    try {
        const id = 1;
        // const domain_url = process.env.WEB_APP_URL!;
        const { priceInCents, name } = store_items.get(Number(id));

        const charges = await stripe.charges.create({
            amount: 10000,
            source: 'tok_visa',
            currency: 'usd'
        });

        console.log(charges);
    } catch (error: any) {
        // return res.status(500).json({
        //     success: false,
        //     error: error.message
        // });
        console.log(error);
    }
}


const create_payment_intent = async () => {
    try {
        const id = 1;
        // const domain_url = process.env.WEB_APP_URL!;
        const { priceInCents, name } = store_items.get(Number(id));

        const payment_intent = await stripe.paymentIntents.create({
            amount: 10000,
            payment_method_types: ['card'],
            // payment_method: 'tok_visa',
            currency: 'usd'
        });

        console.log(payment_intent);
    } catch (error: any) {
        // return res.status(500).json({
        //     success: false,
        //     error: error.message
        // });
        console.log(error);
    }
}

create_checkout_session();
// create_charges();
// create_payment_intent();