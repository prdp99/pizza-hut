import dbConnect from "@/lib/db";
import Product from "@/models/Product";

export type ResponseType = {
    status: number
    message: string
    data: any
}

export type ProductType = {
    title: string
    desc: string
    img: string
    prices: number[]
    extraOption: {
        text: string
        price: number
    }[]
}

export async function getProducts() {
    try {
        await dbConnect()

        const products = await Product.find().lean()

        return {
            status: 200,
            message: 'Products fetched successfully',
            data: products
        }

    } catch (error) {
        console.log('Error fetching products', error)
        return {
            status: 500,
            message: 'Error fetching products',
            data: null
        }

    }

}

export async function getProductById(id: string) {
    try {
        await dbConnect()

        const product = await Product.findById(id)

        if (!product) {
            return {
                status: 404,
                message: 'Product not found',
                data: null
            }
        }

        return {
            status: 200,
            message: 'Product fetched successfully',
            data: product
        }

    } catch (error) {
        console.log('Error fetching product', error)
        return {
            status: 500,
            message: 'Error fetching product',
            data: null
        }
    }
}