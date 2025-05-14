import { createOrder } from '@/actions/order'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
    const rawBody = await req.arrayBuffer()
    const bodyBuffer = Buffer.from(rawBody)
    const head = await headers()
    const sig = head.get('stripe-signature') as string

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(bodyBuffer, sig, endpointSecret)
    } catch (err) {
        console.error('Webhook verification failed', err)
        return new NextResponse('Webhook Error', { status: 400 })
    }

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const metadata = paymentIntent.metadata

        try {
            await createOrder({
                orderDetails: JSON.parse(metadata.orderDetails),
                userId: metadata.userId,
                paymentIntentId: paymentIntent.id,
                amount: paymentIntent.amount,
            })

            console.log('order created')

            return NextResponse.json({
                status: 200,
                message: 'Order created succesfully'
            })


        } catch (err) {
            console.error('❌ Failed to create order:', err)

            return NextResponse.json({
                status: 500,
                message: 'Failed to create Order'
            })
        }
    }

    return NextResponse.json({ received: true })
}
