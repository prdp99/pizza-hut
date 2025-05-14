import { getAllOrders } from '@/actions/order';
import OrderRow from './row';



const OrdersPage = async () => {
  // const status = order.status || 'pending';

  const response = await getAllOrders()

  console.log('ALL ORDERS: ', response?.data)


  // const statusClass = (status: string) => {
  //   if (status === 'pending') return 'text-green-600';
  //   if (status === 'preparing') return 'animate-pulse text-yellow-500';
  //   if (status === 'on the way') return 'text-gray-400 opacity-50';
  //   if (status === 'delivered') return 'text-gray-400 opacity-50';
  // };

  return (
    <div className='p-8  min-h-screen space-y-3 flex flex-col '>
      <h2 className='font-bold text-2xl '>My Orders</h2>
      <div className="flex flex-col md:flex-row gap-8 ">
        {/* Left Section */}
        <div className="flex-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 px-4">Pizza</th>
                  <th className="py-2 px-4">Order ID</th>
                  <th className="py-2 px-4">Title</th>
                  <th className="py-2 px-4">Size</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Address</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {
                  response?.data?.map((order) => (
                    <OrderRow key={order._id} orderDetails={order} />
                  ))
                }
              </tbody>
            </table>
          </div>


        </div>


      </div>
    </div>
  );
};

export default OrdersPage;