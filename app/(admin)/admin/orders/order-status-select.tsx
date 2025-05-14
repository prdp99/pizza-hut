'use client'

import { updateOrderStatus } from "@/actions/admin/order"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { startTransition, useActionState } from "react"

const initialState = {
  msg: '',
  err: ''
}

interface OrderStatusSelectProps {
  currentStatus: string
  orderId: string
}

export function OrderStatusSelect({ currentStatus, orderId }: OrderStatusSelectProps) {
  const updateStatus = async (prevState: typeof initialState, newStatus: string) => {
    try {
      startTransition(async () => {

        await updateOrderStatus(orderId, newStatus)
      })
      return { msg: 'Status updated successfully', }
    } catch (err) {
      console.log('error', err)
      return { msg: 'Something went wrong' }
    }
  }

  // @ts-expect-error error

  const [ , dispatch, pending] = useActionState(updateStatus, initialState)

  return (
    <Select
      disabled={pending}
      value={currentStatus}
  // @ts-expect-error error
      onValueChange={(value) => dispatch(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Change status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="preparing">Preparing</SelectItem>
        <SelectItem value="on the way">On the Way</SelectItem>
        <SelectItem value="delivered">Delivered</SelectItem>
      </SelectContent>
    </Select>
  )
}
