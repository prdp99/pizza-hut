import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function EmptyOrders() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-gray-100 p-6 mb-4">
        <ShoppingBag className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">No orders yet</h3>
      <p className="mt-1 text-sm text-gray-500 max-w-md">
        {" You haven't placed any orders yet. When you do, they'll appear here for you to track."}
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Order a Pizza</Link>
      </Button>
    </div>
  )
}
