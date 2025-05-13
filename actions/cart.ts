'use server'
import { authGaurd } from "@/lib/auth-middleware";
import dbConnect from "@/lib/db";
import Cart from "@/models/Cart";
import { revalidatePath } from "next/cache";

export async function getCart() {
    try {


        await dbConnect()
        const session = await authGaurd()
        const userId = session?.user?.id
        const cart = await Cart.findOne({ userId })

        // console.log('========getting cart====',cart)

        return {
            status: 200,
            data: cart,
        }

    } catch (err) {
        return {
            status: 500,
            message: "Internal Server Error",
        }

    }
}

export async function getAllCartItems() {
    try {

        console.log('========getting ALL CART====')

        await dbConnect()
        const session = await authGaurd();
        const userId = session?.user?.id
        const cart = await Cart.findOne({ userId })

        console.log('pop cart from server', cart)
        return {
            status: 200,
            data: cart,
        }

    } catch (err) {
        console.log('error at getAllcart', err)
        return {
            status: 500,
            message: "Internal Server Error",
            error: err
        }

    }
}

export async function addCart(params: { productId: string, quantity: number, extraOption: string, price: number }) {

    const { productId, quantity, price, extraOption } = params

    console.log("adding to cart server==", params)

    if (!productId || !quantity) {
        return {
            status: 400,
            message: "ProdutId and quantity are required",
        }
    }
    try {


        await dbConnect()
        const session = await authGaurd()
        const userId = session?.user?.id

        const cartExist = await Cart.findOne({ userId })

        if (!cartExist) {
            const newCart = await Cart.create({
                userId,
                products: [{
                    productId,
                    quantity,
                    extraOption,
                    price
                }],
                totalCartPrice: price
            })
            
            console.log("new cart created==", newCart)
            revalidatePath('/cart')

            return {
                status: 200,
                data: newCart,
            }
        }

        const totalCartPrice = cartExist.totalCartPrice + price

        const updatedCart = await Cart.findOneAndUpdate(
            { userId }, // Match the cart by userId
            {
                $addToSet: {
                    products: {
                        productId, quantity, extraOption,
                        price
                    },

                },
                totalCartPrice
            }, // Add new product
            { new: true } // Return the updated document
        );

        console.log('updated cart=======', updatedCart)


        revalidatePath('/cart')
        // revalidatePath('/')
        return {
            status: 200,
            data: null,
            message: "Product added to cart successfully",
        }

    } catch (err) {
        console.log("error in add cart==", err)
        return {
            status: 500,
            message: "Failed to add to cart",
        }
    }
}

export async function removeCartItem(productId: string) {

    if (!productId) {
        return {
            status: 400,
            message: "ProductId is required",
        }
    }

    console.log('product to delete========', productId)

    try {
        await dbConnect()
        const session = await authGaurd()
        const userId = session?.user?.id
        const cart = await Cart.findOne({ userId })

        if (!cart) {
            return {
                status: 404,
                message: "Cart not found",
            }
        }

        const product = cart.products.find((prod) => {
            if (prod._id == productId) {
                return prod
            }
        })

        console.log('totalCartPrice', product)
        const totalCartPrice = cart.totalCartPrice - product.price


        const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            {
                $pull: { products: { _id: productId } },
                totalCartPrice
            }, // Remove the product with the specified productId
            { new: true }
        );

        if (!updatedCart) {
            return {
                status: 404,
                message: "Product not found in cart",
            }
        }

        console.log("Updated Cart after removal:", updatedCart);
        revalidatePath('/cart')

        return {
            status: 200,
            message: "Product removed from cart successfully",
        }

    } catch (error) {

        console.error("Error removing product from cart:", error);
        return {
            status: 500,
            message: "Failed to remove product from cart",
        }

    }
}