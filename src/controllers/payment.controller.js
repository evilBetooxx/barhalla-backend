import Stripe from "stripe";
import axios from "axios";

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
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const stripe = new Stripe(STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "MXN",
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
    success_url: "http://localhost:5173/barhalla/success",
    cancel_url: "http://localhost:5173/barhalla/cancel",
  });

  res.json(session);
};

export const createOrder = async (req, res) => {
  const order = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "MXN",
          value: "100.00",
        },
      },
    ],
    application_context: {
      brand_name: "Barhalla",
      landing_page: "NO_PREFERENCE",
      user_action: "PAY_NOW",
      return_url: `${process.env.HOST}/capture-order`,
      cancel_url: `${process.env.HOST}/cancel-order`,
    },
  };

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const {
    data: { access_token },
  } = await axios.post(`${process.env.PAYPAL_API}/v1/oauth2/token`, params, {
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_SECRET_KEY,
    },
  });

  const response = await axios.post(
    `${process.env.PAYPAL_API}/v2/checkout/orders`,
    order,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  // console.log(response.data);
  const success = response.data.links[1].href
  res.redirect(success);
};

export const captureOrder = async (req, res) => {
  const { token } = req.query;
  try {
    const response = await axios.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: process.env.PAYPAL_CLIENT_ID,
          password: process.env.PAYPAL_SECRET_KEY,
        },
      }
    );
    console.log(response.data);
    return res.send(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const cancelOrder = async (req, res) => {};
