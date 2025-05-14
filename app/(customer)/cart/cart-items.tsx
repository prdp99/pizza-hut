import { Product } from "@/app/(admin)/admin/dashboard/product-table"
import CartItem from "./item"
interface CartItemsProps {
    products: Product[]
}
const CartItems = ({ products }: CartItemsProps) => {
    return (
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Cart Items</h2>
            <div className="space-y-4">
                {/* Example Cart Item */}
                {
                    products?.map((product) => (
                        <CartItem key={product._id} product={product} />
                    ))
                }

                {/* Add more cart items here */}
            </div>
        </div>
    )
}

export default CartItems