import { getProductById } from '@/actions/product'
import { OrderType } from '@/app/(admin)/admin/orders/order-details-dialog'
import Image from 'next/image'
import Link from 'next/link'

interface OrderDetailsProps {
    orderDetails: OrderType
}

const OrderRow = async ({ orderDetails }:OrderDetailsProps) => {
    const response = await getProductById(orderDetails?.productId)

    console.log('pizza details', response?.data)

    const size = orderDetails.extraOption === 'sm' ? 'Small' : orderDetails.extraOption === 'md' ? 'Medium' : 'Large'
    return (
        <tr className="border-b">
            <td>
                <div className="w-30 h-30  rounded-lg flex-shrink-0">
                    <Link href={`/product/${orderDetails.productId}`} title={response?.data?.title}>
                        <Image
                            src={response?.data?.img || "/img/pizza.png"}
                            alt={"Product"}
                            className="w-full h-full object-cover rounded-lg"
                            // fill
                            height={30}
                            width={30}
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