import { TableCell, TableRow } from "@/components/ui/table"
import OrderStatus from "./order-status"
import Image from "next/image"

const OrderRow = ({ orderDetails }) => {
  return (
    <TableRow className="hover:bg-gray-50 transition-colors">
      <TableCell>
        <div className="relative h-16 w-16 overflow-hidden rounded-md">
          <Image src="/img/pizza.png" alt="Pizza" fill className="object-cover" sizes="64px" />
        </div>
      </TableCell>
      <TableCell className="font-medium">{orderDetails.orderId}</TableCell>
      <TableCell>{orderDetails.customerName}</TableCell>
      <TableCell className="hidden md:table-cell max-w-[200px] truncate">{orderDetails.customerAddress}</TableCell>
      <TableCell>
        <OrderStatus status={orderDetails.status} />
      </TableCell>
      <TableCell className="text-right font-medium">${Number.parseFloat(orderDetails.price).toFixed(2)}</TableCell>
    </TableRow>
  )
}

export default OrderRow
