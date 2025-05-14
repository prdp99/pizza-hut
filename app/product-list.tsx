import { getProducts } from '@/actions/product'
import React from 'react'
import ProductCard from './product-card'
import Link from 'next/link'

interface ProductType {
    _id: string
    title: string
    desc: string
    img: string

}

const ProductList = async () => {
    const response = await getProducts()
    const { status, message, data } = response

    if (status !== 200) {
        return (
            <div className='flex items-center justify-center w-full h-screen'>
                <h1 className='text-2xl font-bold text-red-500'>{message}</h1>
            </div>
        )
    }

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pl-12 pb-5'>
                {data && (data as unknown as ProductType[]).map((product: ProductType) => (
                    <Link href={`/product/${product._id}`} key={product._id} className=' max-w-[280px] flex items-center justify-center'>
                        <ProductCard product={product} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ProductList