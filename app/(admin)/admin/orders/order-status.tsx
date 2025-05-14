import { Badge } from "@/components/ui/badge"

const OrderStatus = ({ status }: {status: string}) => {
  // Convert numeric status to string if needed
  let statusText =
    typeof status === "number" ? ["Payment Pending", "Preparing", "On the Way", "Delivered"][status] : status

  // Default to the string value if it's already a string
  statusText = statusText || "Processing"

  const getStatusStyles = () => {
    switch (statusText.toLowerCase()) {
      case "payment pending":
      case "pending":
        return {
          variant: "outline",
          className: "border-orange-200 bg-orange-100 text-orange-800 hover:bg-orange-100",
        }
      case "preparing":
        return {
          variant: "outline",
          className: "border-blue-200 bg-blue-100 text-blue-800 hover:bg-blue-100",
        }
      case "on the way":
        return {
          variant: "outline",
          className: "border-purple-200 bg-purple-100 text-purple-800 hover:bg-purple-100",
        }
      case "delivered":
        return {
          variant: "outline",
          className: "border-green-200 bg-green-100 text-green-800 hover:bg-green-100",
        }
      default:
        return {
          variant: "outline",
          className: "border-gray-200 bg-gray-100 text-gray-800 hover:bg-gray-100",
        }
    }
  }

  const styles = getStatusStyles()

  return (
    // @ts-expect-error error
    <Badge variant={styles.variant} className={styles.className}>
      {statusText}
    </Badge>
  )
}

export default OrderStatus
