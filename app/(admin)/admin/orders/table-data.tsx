import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { OrderStatusBadge } from './order-status-badge'
import { OrderStatusSelect } from './order-status-select'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { OrderType } from './order-details-dialog'
import moment from 'moment'

interface TableDataProps {
  orders: OrderType[]
}
const TableData = ({ orders }: TableDataProps) => {
  return (
    <div className="rounded-md border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] cursor-pointer" >
                <div className="flex items-center">Order ID </div>
              </TableHead>
              <TableHead className="cursor-pointer" >
                <div className="flex items-center">Customer </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">Address</TableHead>
              <TableHead className="cursor-pointer">
                <div className="flex items-center">Date </div>
              </TableHead>
              <TableHead className="cursor-pointer">
                <div className="flex items-center">Total</div>
              </TableHead>
              <TableHead className="cursor-pointer" >
                <div className="flex items-center">Status </div>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              orders?.map((order) => (
                <TableRow key={order._id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{order.orderId}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-[200px] truncate">{order.customerAddress}</TableCell>
                  <TableCell>{moment(order?.createdAt).format('MMMM Do YYYY')}</TableCell>
                  <TableCell>${order.price}</TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <OrderStatusSelect
                        currentStatus={order.status}
                        orderId={order._id}
                      // onStatusChange={(newStatus) => handleStatusChange(order.id, newStatus)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        // onClick={() => viewOrderDetails(order)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            }



          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default TableData