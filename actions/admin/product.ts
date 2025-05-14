'use server'
import { ProductFormValues } from "@/app/(admin)/admin/dashboard/add-product-dialog"
import dbConnect from "@/lib/db"
import { uploadImage } from "@/lib/upload-image"
import Product from "@/models/Product"
import { revalidatePath } from "next/cache"

export async function addProduct(param: ProductFormValues) {

    const {
        title,
        desc,
        img,
        prices,
    } = param

    console.log('values', param)

    try {
        await dbConnect()

        if (!img) {
            return {
                status: 422,
                message: 'Image is required'
            }
        }
        const image = await uploadImage(img as File, 'products')

        if (!image) {
            return {
                status: 400,
                message: 'Image is not uploaded'
            }
        }

        console.log('uploaded image', image)



        const product = await Product.create({
            title, desc, img: image as string, prices
        })

        revalidatePath('/admin/dashboard')
        console.log('product added', product)
        return {
            stauts: 201,
            message: 'product added '
        }



    } catch (error) {
        console.log('error occured', error)
        return {
            stauts: 500,
            message: 'failed to add product '
        }


    }
}

export async function updateProduct(productId:string , param: ProductFormValues) {

    const {
        title,
        desc,
        img,
        prices,
    } = param

    console.log('values', param)
    try {
        await dbConnect()

        const productExist = await Product.findById(productId)
        if (!productExist) return { status: 404, message: 'Product Not Found!' }


        let image;
        if (img !== productExist.img) {
            
            image = await uploadImage(img as File, 'products')
            if (!image) {
                return {
                    status: 400,
                    message: 'Image is not uploaded'
                }
            }
            console.log('uploaded image', image)
        }


        const product = await Product.findByIdAndUpdate(
            productId,
            {
                title, desc, img: image as string, prices
            }
        )
        revalidatePath('/admin/dashboard')
        console.log('product updated', product)
        
        return {
            stauts: 200,
            message: 'product updated '
        }

    } catch (error) {
        console.log('error occured', error)
        return {
            stauts: 500,
            message: 'failed to update product '
        }
    }
}

export async function deleteProduct(productId: string) {

    if (!productId) return { status: 422, message: 'ProductId is required' }

    try {

        const product = await Product.findByIdAndDelete(productId)

        if (!product) return { status: 404, message: 'Product NOT FOUND!' }

        revalidatePath('/admin/dashboard')

        return { status: 200, message: 'Product Deleted' }


    } catch (error) {
        console.log('ERROR AT DELETE PRODUCT:', error)
        return { status: 500, message: 'Failed Product Deleted' }
    }
}