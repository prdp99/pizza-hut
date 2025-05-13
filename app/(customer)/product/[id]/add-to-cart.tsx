'use client'
import { addCart } from '@/actions/cart'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useAuth from '@/hooks/use-auth'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

type AddToCartProps = {
    productId: string
    prices: number[]
}

const AddToCart = ({ productId, prices }: AddToCartProps) => {

    const { openDialog, isAuthenticated } = useAuth()

    const [quantity, setQuantity] = useState(1)

    const [isPending, setIsPending] = useState(false)

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



    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10)
        if (value >= 1) {
            setQuantity(value)
        }
    }

    const handleAddToCart = async () => {

        if (!isAuthenticated) {
            return openDialog()
        } else {
            setIsPending(true)
            try {
                const res = await addCart({ productId, quantity, extraOption: selectedSize, price })
                console.log("add to cart response==", res)
                // fetchCart()
                setIsPending(false)
                toast.success('Added to cart!')
            } catch (error) {
                console.error('Error adding to cart:', error)
                toast.error('Failed to add to cart. Please try again.')
                setIsPending(false)
            }
        }

    }


    return (
        <div className='flex gap-2 items-center' >
            <Input type='number' className='bg-white w-20 text-black' value={quantity} onChange={handleQuantityChange} />
            <Button
                size={'sm'}
                variant={'outline'}
                className='bg-red-600 text-white hover:bg-red-700 transition duration-300 ease-in-out'
                onClick={handleAddToCart}
                disabled={isPending}
            >
                Add To Cart
            </Button>
        </div>

    )
}

export default AddToCart