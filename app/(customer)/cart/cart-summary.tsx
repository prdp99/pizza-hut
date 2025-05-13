import React from 'react'

interface CartSummaryProps {
    totalCartPrice: number
}

const CartSummary = ({ totalCartPrice }:CartSummaryProps) => {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Cart Summary</h2>
            <div className="space-y-2">
                {/* <div className="flex justify-between text-gray-600">
									<span>Subtotal:</span>
									<span>$49.98</span>
								</div>
								<div className="flex justify-between text-gray-600">
									<span>Discount:</span>
									<span>$0.00</span>
            				  </div> */}
                <div className="flex justify-between text-gray-800 font-bold">
                    <span>Total:</span>
                    <span>${totalCartPrice}</span>
                </div>
            </div>
        </div>
    )
}

export default CartSummary