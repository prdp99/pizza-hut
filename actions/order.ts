'use server'
import { authGaurd } from "@/lib/auth-middleware"
import dbConnect from "@/lib/db"
import Cart from "@/models/Cart"
import Order from "@/models/Order"
import { revalidatePath } from "next/cache"

export async function createOrder(params: type) {

    const { orderDetails, paymentIntentId, amount, userId } = params
    const { customerName, customerPhone, customerAddress, customerDescription } = orderDetails

    await dbConnect()

    const cart = await Cart.findOne({ userId })

    if (!cart) {
        throw new Error('could not find cart')
    }

    console.log('creating orderssss', cart?.products)
    const orders = await Promise.all(
        cart?.products?.map(async (prod) => {
            const order = new Order({
                userId,
                productId: prod.productId,
                quantity: prod.quantity,
                extraOption: prod.extraOption,
                price: prod.price,
                customerPhone,
                customerName,
                customerAddress,
                customerDescription
            })
            return await order.save()
        })
    );

    console.log('order created', orders)

    await cart.deleteOne()

    revalidatePath('/cart')
    // revalidatePath('/orders')
    console.log('✅ Order created successfully')

}

export async function getAllOrders() {

    try {
        await dbConnect()
        const session = await authGaurd()
        const userId = session?.user?.id
        const orders = await Order.find({ userId })

        return {
            status: 200,
            data: orders
        }

    } catch (error) {

        return {
            status: 500,
            message: 'Failed to fetch orders!'
        }

    }

}