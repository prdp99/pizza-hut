import Link from 'next/link'
import React from 'react'

const PaymentSuccessPage = ({
    searchParams: { amount }
}: {
    searchParams: { amount: string }
}) => {
    return (
        <main>
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className='text-2xl font-bold'>Payment Successful</h1>
                <p className='mt-4'>Thank you for your payment of ${amount}!</p>
                <p className='mt-2'>Your order has been processed successfully.</p>

                <Link href={'/orders'}>
                    View Order Details
                </Link>
            </div>

        </main>
    )
}

export default PaymentSuccessPage