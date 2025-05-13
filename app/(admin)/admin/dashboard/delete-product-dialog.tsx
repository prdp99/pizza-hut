"use client"

import { deleteProduct } from "@/actions/admin/product"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

export function DeleteProductDialog({ productId, title }: { productId: string, title: string }) {

  const [isOpen, setIsOpen] = useState(false)

  const [isPending, setIsPending] = useState(false)

  const handleDelete = async () => {

    setIsPending(true)
    try {
      await deleteProduct(productId)
      toast.success('Product deleted!')
      setIsPending(false)
      setIsOpen(false)
    } catch (error) {

      console.log('error while deleting', error)
      setIsPending(false)
    }

  }
  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <Trash2 className="h-4 w-4 text-red-500" />
        <span className="sr-only">Delete</span>
      </Button>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the product &quot;{title}&quot;. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">

              {
                isPending ? 'deleting' : 'Delete'
              }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
