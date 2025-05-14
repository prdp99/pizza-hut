import Image from 'next/image'
import React from 'react'

interface OrderStatusProps {
    status: number
}
const OrderStatus = ({ status }: OrderStatusProps) => {

    return (
        <div>
            {status === 1 &&
                (
                    <div>
                        <Image src="/img/paid.png" width={30} height={30} alt="Paid" />
                        <span className="mt-2 text-sm font-medium">Payment</span>
                    </div>
                )}
        </div>
    )
}

export default OrderStatus