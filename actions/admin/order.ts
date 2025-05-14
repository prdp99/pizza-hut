'use server'
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { revalidatePath } from "next/cache";

export async function getAllOrders() {

    try {
        await dbConnect()
        return await Order.find().lean()

    } catch (error) {
        throw new Error('Cant fetch')
        // return {
        //     status: 500,
        //     message: 'Error during fetching'
        // }

    }

}

export async function updateOrderStatus(orderId: string, status: string) {

    try {
        const order = await Order.findById(orderId)

        if (!order) throw new Error('Cant find order!')

        order.status = status
        await order.save()
        revalidatePath('/orders')
        revalidatePath('/admin/orders')  

    } catch (error) {

        console.log('ERROR AT UPDATE ORDER STATUS: ', error)

        throw new Error('Error while updating order status!')
    }

}