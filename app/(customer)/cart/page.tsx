import React from 'react';
import CheckoutForm from './checkout-form';
import CartItems from './cart-items';
import { getAllCartItems } from '@/actions/cart';
import CartSummary from './cart-summary';

export const dynamic = 'force-dynamic'


const CartPage = async () => {
	const response = await getAllCartItems()
	const totalCartPrice = response?.data?.totalCartPrice || 0
	const products = response?.data?.products || []

	console.log('cart======summary',response?.data)

	return (
		<div className="min-h-screen bg-gray-100 py-10">
			<div className="container mx-auto px-4">
				<h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

				{/* Cart Items Section */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Left Section: Cart Items */}
					<CartItems  products={products} />

					{/* Right Section: Cart Summary */}
					<div className="bg-white p-6 rounded-lg shadow-md">
						<CartSummary totalCartPrice={totalCartPrice}/>
						<CheckoutForm amount={totalCartPrice}/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartPage;