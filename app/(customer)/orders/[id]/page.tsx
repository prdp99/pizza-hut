
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const order = {
    _id: '1234567890',
    customer: 'John Doe',
    address: '123 Main St, Cityville, ST 12345',
    total: 50.0,
    status: 1, // Example status (0: Payment, 1: Preparing, 2: On the Way, 3: Delivered)
}

const OrderDetailPage = () => {
    const status = order.status || 1;

    const statusClass = (index: number) => {
        if (index - status < 1) return 'text-green-600';
        if (index - status === 1) return 'animate-pulse text-yellow-500';
        if (index - status > 1) return 'text-gray-400 opacity-50';
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 p-8">
            {/* Left Section */}
            <div className="flex-1">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-gray-600 border-b">
                                <th className="py-2 px-4">Order ID</th>
                                <th className="py-2 px-4">Customer</th>
                                <th className="py-2 px-4">Address</th>
                                <th className="py-2 px-4">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="py-2 px-4">{order._id}</td>
                                <td className="py-2 px-4">{order.customer}</td>
                                <td className="py-2 px-4">{order.address}</td>
                                <td className="py-2 px-4 font-bold">${order.total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
                    {/* Status: Payment */}
                    <div className={`flex flex-col items-center ${statusClass(0)}`}>
                        <Image src="/img/paid.png" width={30} height={30} alt="Paid" />
                        <span className="mt-2 text-sm font-medium">Payment</span>
                        {status >= 0 && (
                            <Image src="/img/checked.png" width={30} height={30} alt="Checked" />
                        )}
                    </div>

                    {/* Status: Preparing */}
                    <div className={`flex flex-col items-center ${statusClass(1)}`}>
                        <Image src="/img/bake.png" width={30} height={30} alt="Preparing" />
                        <span className="mt-2 text-sm font-medium">Preparing</span>
                        {status >= 1 && (
                            <Image src="/img/checked.png" width={30} height={30} alt="Checked" />
                        )}
                    </div>

                    {/* Status: On the Way */}
                    <div className={`flex flex-col items-center ${statusClass(2)}`}>
                        <Image src="/img/bike.png" width={30} height={30} alt="On the Way" />
                        <span className="mt-2 text-sm font-medium">On the Way</span>
                        {status >= 2 && (
                            <Image src="/img/checked.png" width={30} height={30} alt="Checked" />
                        )}
                    </div>

                    {/* Status: Delivered */}
                    <div className={`flex flex-col items-center ${statusClass(3)}`}>
                        <Image src="/img/delivered.png" width={30} height={30} alt="Delivered" />
                        <span className="mt-2 text-sm font-medium">Delivered</span>
                        {status >= 3 && (
                            <Image src="/img/checked.png" width={30} height={30} alt="Checked" />
                        )}
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Cart Total</h2>
                <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal:</span>
                        <span>${order.total}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Discount:</span>
                        <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-gray-800 font-bold">
                        <span>Total:</span>
                        <span>${order.total}</span>
                    </div>
                </div>
                <Button
                    disabled
                    className="w-full mt-6 bg-green-600 text-white cursor-not-allowed"
                >
                    PAID
                </Button>
            </div>
        </div>
    );
};

export default OrderDetailPage;