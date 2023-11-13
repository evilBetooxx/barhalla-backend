import Stripe from "stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(STRIPE_SECRET_KEY);

export const createSession = async (req, res) => {
  // const { price, name, description, image } = req.body;

  /* const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: name,
                        description: description,
                        images: [image],
                    },
                    unit_amount: price * 100,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:4000/barhalla/success',
        cancel_url: 'http://localhost:4000/barhalla/cancel',
    });

    */

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
            description: "Comfortable cotton t-shirt",
          },
          unit_amount: 200000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:4000/barhalla/success",
    cancel_url: "http://localhost:4000/barhalla/cancel",
  });

  res.json(session);
};
