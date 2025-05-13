import React from 'react'
import OrderStatus from './status'
import { getProductById } from '@/actions/product'
import Link from 'next/link'

const OrderRow = async ({ orderDetails }) => {
    const response = await getProductById(orderDetails?.productId)

    console.log('pizza details', response?.data)

    const size = orderDetails.extraOption === 'sm' ? 'Small' : orderDetails.extraOption === 'md' ? 'Medium' : 'Large'
    return (
        <tr className="border-b">
            <td>
                <div className="w-30 h-30  rounded-lg flex-shrink-0">
                    <Link href={`/product/${orderDetails.productId}`} title={response?.data?.title}>
                        <img
                            src={response?.data?.img || "/img/pizza.png"}
                            alt={"Product"}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </Link>
                </div>
            </td>
            <td className="py-2 px-4">{orderDetails.orderId}</td>
            <td className="py-2 px-4">
                <Link href={`/product/${orderDetails.productId}`} className='hover:text-red-600 transition duration-300 ease-in-out'>
                    {response?.data?.title}
                </Link>
            </td>

            <td className="py-2 px-4">{size}</td>

            <td className="py-2 px-4">{orderDetails.customerName}</td>
            <td className="py-2 px-4">{orderDetails.customerAddress}</td>
            <td>
                {/* <OrderStatus status={orderDetails.status} /> */}
                <td className="py-2 px-4">{orderDetails.status}</td>
            </td>
            <td className="py-2 px-4 font-bold">${orderDetails.price}</td>
        </tr>
    )
}

export default OrderRow