'use client'
import { OrderType } from '@/app/(admin)/admin/orders/order-details-dialog'
import { Button } from '@/components/ui/button'
import { convertToSubcurrency } from '@/lib/stripe-helper'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'

interface CheckPageProps {
    amount: number
    orderDetails: OrderType[]
    userId: string
}

const CheckPage = ({ amount, orderDetails, userId }: CheckPageProps) => {

    const stripe = useStripe()

    const elements = useElements()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [clientSecret, setClientSecret] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: convertToSubcurrency(amount),
                metadata: {
                    orderDetails: JSON.stringify(orderDetails),
                    userId: userId
                }
            })
        })
            .then((response) => response.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
            })
            .catch((error) => {
                console.error('Error fetching client secret:', error)
                setErrorMessage('Failed to fetch client secret')
            })

    }, [amount, orderDetails, userId])



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        if (!stripe || !elements) {
            return
        }

        const { error: submitError } = await elements.submit()

        if (submitError) {
            setErrorMessage(submitError.message || 'An error occurred during payment submission')
            setLoading(false)
            return
        }

        if(!clientSecret) {
            setLoading(false)
            return
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://localhost:3000/orders`,
            },
        })

        if (error) {
            setErrorMessage(error.message || 'An error occurred during payment confirmation')
        }

        setLoading(false)

    }

    if (!clientSecret || !stripe || !elements) {

        return <div className='flex justify-center items-center'>
            {/* tailwind spinner */}
            <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"></path>
            </svg>
        </div>
    }



    return (

        <form onSubmit={handleSubmit}>


            {clientSecret &&
                <PaymentElement />
            }
            <Button
                type='submit'
                disabled={!stripe || loading}
                size={'lg'}
                className='w-full mt-4'
            >
                {!loading ? `Pay $${amount}` : 'Processing...'}
            </Button>
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    )
}

export default CheckPage