import { NextResponse } from "next/server";
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
    try {
        const { amount, metadata } = await request.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Convert to cents
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata
        })

        console.log('Created payment intent')

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,

        })

    } catch (error) {

        console.error('Error creating payment intent:', error);
        return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });

    }

}