'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

type ProductPriceProps = {
    prices: number[]
}

const ProductPrice = ({ prices }: ProductPriceProps) => {
    const searchParams = useSearchParams()
    const selectedSize = searchParams.get('size') || 'sm'

    // Map sizes to their corresponding prices
    const sizePriceMap: Record<string, number> = {
        sm: prices[0],
        md: prices[1],
        lg: prices[2],
    }

    // Get the price based on the selected size, default to 'sm' price
    const price = sizePriceMap[selectedSize] ?? prices[0]

    return (
        <div>
            <p className="text-3xl font-semibold text-red-600 underline">${price}</p>
        </div>
    )
}

export default ProductPrice