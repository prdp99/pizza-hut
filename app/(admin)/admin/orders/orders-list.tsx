
import { OrderDetailsDialog } from "./order-details-dialog"
// import { useToast } from "@/hooks/use-toast"
import Filter from "./filter"
import Search from "./search"
import TableData from "./table-data"

export function OrdersList({ orders }) {


  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        {/* <Search /> */}
        <Filter />
      </div>

      <TableData orders={orders}/>

      {/* <div className="text-sm text-gray-500 mt-2">
        Showing {filteredOrders.length} of {orders.length} orders
      </div> */}

      {/* {selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          onStatusChange={(newStatus) => handleStatusChange(selectedOrder.id, newStatus)}
        />
      )} */}
    </div>
  )
}
