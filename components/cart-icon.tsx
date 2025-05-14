import { getAllCartItems } from '@/actions/cart'

const CartIcon = async () => {
    const response = await getAllCartItems()
    const products = response?.data?.products || []
    return (
        <div className="absolute top-[-10px] right-[-10px] w-[20px] h-[20px] bg-white rounded-full flex items-center justify-center font-bold text-[#d1411e]">
            {products?.length || 0}
        </div>
    )
}

export default CartIcon