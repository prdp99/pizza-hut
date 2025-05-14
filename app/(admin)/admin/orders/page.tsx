import { Suspense } from "react"
import { OrdersList } from "./orders-list"
import { OrdersListSkeleton } from "./orders-list-skeleton"
import { getAllOrders } from "@/actions/admin/order"
import { OrderType } from "./order-details-dialog"

export default async function OrdersPage() {
  const orders = await getAllOrders()
  console.log('orders',orders)

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Orders</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and track customer orders</p>
        </div>
      </div>

      <Suspense fallback={<OrdersListSkeleton />}>
        <OrdersList orders={orders as unknown as OrderType[]} />
      </Suspense>
    </div>
  )
}
