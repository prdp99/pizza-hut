import { Badge } from "@/components/ui/badge"

export function OrderStatusBadge({ status }: { status: string }) {
  // Convert numeric status to string if needed
  const getStatusInfo = () => {
    switch (status) {
      case 'pending':
        return {
          label: "Payment Pending",
          variant: "outline",
          className: "border-orange-200 bg-orange-100 text-orange-800 hover:bg-orange-100",
        }
      case 'preparing':
        return {
          label: "Preparing",
          variant: "outline",
          className: "border-blue-200 bg-blue-100 text-blue-800 hover:bg-blue-100",
        }
      case "on the way":
        return {
          label: "On the Way",
          variant: "outline",
          className: "border-purple-200 bg-purple-100 text-purple-800 hover:bg-purple-100",
        }
      case 'delivered':
        return {
          label: "Delivered",
          variant: "outline",
          className: "border-green-200 bg-green-100 text-green-800 hover:bg-green-100",
        }
      default:
        return {
          label: "Unknown",
          variant: "outline",
          className: "border-gray-200 bg-gray-100 text-gray-800 hover:bg-gray-100",
        }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    // @ts-expect-error erro
    <Badge variant={statusInfo.variant} className={statusInfo.className}>
      {statusInfo.label}
    </Badge>
  )
}
