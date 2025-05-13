import Image from 'next/image'
import React from 'react'

type ProductCardProps = {
    product: {
        _id: string
        title: string
        desc: string
        img: string

    }
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (

        <div className="flex flex-col p-4  items-center max-h-[500px] overflow-hidden text-clip gap-2">
            <Image src={product.img} alt={product.title} width={250} height={250} className="object-cover cursor-pointer hover:scale-[1.1] duration-300 transition ease-in-out " />
            <h1 className="text-xl font-bold text-red-600">{product.title}</h1>
            <h1 className="desc">{product.desc}</h1>

        </div>
    )
}

export default ProductCard