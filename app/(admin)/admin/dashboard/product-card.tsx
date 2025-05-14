import Image from 'next/image'
import React from 'react'

export type ProductCardProps = {
    product: {
        _id: string
        title: string
        desc: string
        img: string

    }
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (

        <div className="flex flex-col shadow-lg p-4 items-center max-h-[500px] overflow-hidden text-clip">
            <Image src={product.img} alt={product.title} width={250} height={250} className="object-cover " />
            <h1 className="text-2xl font-bold text-red-500">{product.title}</h1>
            <p className="text">{product.desc}</p>
        </div>
    )
}

export default ProductCard