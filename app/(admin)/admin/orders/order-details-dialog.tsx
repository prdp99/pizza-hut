"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { OrderStatusBadge } from "./order-status-badge"
import { OrderStatusSelect } from "./order-status-select"
import { Separator } from "@/components/ui/separator"

export function OrderDetailsDialog({ order, open, onOpenChange, onStatusChange }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order #{order.orderId}</span>
            <OrderStatusBadge status={order.status} />
          </DialogTitle>
          <DialogDescription>Placed on {formatDate(order.date)}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Customer</h3>
              <p className="mt-1 text-sm">{order.customer}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Contact</h3>
              <p className="mt-1 text-sm">{order.phone || "Not provided"}</p>
              <p className="mt-1 text-sm">{order.email || "Not provided"}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Shipping Address</h3>
            <p className="mt-1 text-sm">{order.address}</p>
          </div>

          <Separator />

          <div>
            <h3 className="mb-3 text-sm font-medium">Order Items</h3>
            <div className="space-y-3">
              {order.items ? (
                order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                      <Image
                        src={item.image || "/img/pizza.png"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x ${Number.parseFloat(item.price).toFixed(2)}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      ${(Number.parseFloat(item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                    <Image src="/img/pizza.png" alt="Pizza" fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Pizza Order</p>
                    <p className="text-sm text-gray-500">Order details not available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${(Number.parseFloat(order.total) * 0.9).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>${(Number.parseFloat(order.total) * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${Number.parseFloat(order.total).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:space-x-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Update Status:</span>
            <OrderStatusSelect currentStatus={order.status} onStatusChange={onStatusChange} />
          </div>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
