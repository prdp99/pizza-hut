import { getProductById } from '@/actions/product'
import RemoveCartItem from './remove'

interface Product {
    productId: string
}

const CartItem = async ({ product }: { product: Product }) => {

    const response = await getProductById(product?.productId)
    const productId = response?.data?._id

    return (
        <div className="flex items-center gap-4 border-b pb-4">
            <div className="w-20 h-20  rounded-lg flex-shrink-0">
                <img
                    src={response?.data?.img || "/img/pizza.png"}
                    alt={response?.data?.title || "Product"}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800">{response?.data?.title}</h3>
                <p className="text-sm text-gray-600">Extra Cheese, Pepperoni</p>
                <p className="text-sm text-gray-600">Quantity: {product?.quantity}</p>
            </div>
            <div className="text-lg font-semibold text-gray-800">${response?.data?.prices[0]}</div>

            {/* remove from cart */}
            {
              
                <RemoveCartItem productId={product._id.toString()} />
            }
        </div>
    )
}

export default CartItem