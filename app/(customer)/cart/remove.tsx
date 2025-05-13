'use client'
import { removeCartItem } from "@/actions/cart"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"


const RemoveCartItem = ({ productId }: { productId: string }) => {

    const [loading, setLoading] = useState(false)

    const handleRemove = async () => {
        setLoading(true)
        try {
            await removeCartItem(productId)
        } catch (error) {
            toast.error('Failed to remove item')
        } finally {
            setLoading(false)
        }


    }
    return (
        <Button
            variants='destructive'
            className="bg-red-600 text-white hover:bg-red-700 transition duration-300 ease-in-out flex items-center justify-center"
            onClick={handleRemove}
            disabled={loading}
        >
            <TrashIcon className="w-4 h-4 " />
        </Button>
    )
}

export default RemoveCartItem