'use client'
import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'


const ProductSize = ({ size }: { size: string }) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const height = size === 'sm' ? 40 : size === 'md' ? 55 : 65
    const width = size === 'sm' ? 40 : size === 'md' ? 55 : 65


    const updatePrice = (size: string) => {
        // Update the URL parameter with the selected size
        const currentParams = new URLSearchParams(searchParams.toString())
        currentParams.set('size', size)

        // Push the updated URL to the router
        router.push(`${window.location.pathname}?${currentParams.toString()}`, { scroll: false })

    }
    return (
        <div
            onClick={() => updatePrice(size)}
            className='mt-4 hover:scale-[1.1] transition duration-300 ease-in-out relative flex items-center justify-center cursor-pointer'>
            <div 
                className='absolute text-sm top-0 right-0 bg-green-500 text-white p-1 rounded-md  transition duration-300 ease-in-out'>
                {size}
            </div>
            <div className='flex justify-end'>
                <Image
                    src={`/img/icon.png`}
                    alt={size}
                    width={width}
                    height={height}
                    className=''
                />
            </div>
        </div>
    )
}

export default ProductSize