"use client"

import { updateProduct } from "@/actions/admin/product"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Edit } from "lucide-react"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import { ImageUpload } from "./image-upload"


export const prductFormSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    desc: z.string().min(1, "Description is required"),
    prices: z.array(
      z.number()
        .min(0, "Price must be at least 0")
        .max(99999, "Price is too high")
    ).length(3, "Exactly 3 price values are required"),
    img: z.string().url("Image is required").or(z.instanceof(File)),
  })

export type ProductFormValues = z.infer<typeof prductFormSchema>;

interface EditProductDialogProps {
  productId: string
  product: {
    title: string
    img: string
    desc: string
    prices: number[]
  }
}

export function EditProductDialog({ productId, product }: EditProductDialogProps) {

  const [isPending, setIsPending] = useState(false)

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const sizeLabels = ["sm", "md", "lg"]

  const form = useForm({
    resolver: zodResolver(prductFormSchema),
    defaultValues: {
      title: product.title || "",
      desc: product.desc || "",
      prices: product.prices || [" ", " ", " "],
      img: product.img || "",
    }
  })

  const { fields, } = useFieldArray<ProductFormValues>({
    control: form.control,
    // @ts-expect-error error
    name: "prices",
  });


  const onSubmit = async (formValues: ProductFormValues) => {
    console.log('formValues', formValues)

    setIsPending(true)
    try {
      await updateProduct(productId, formValues)
      toast.success('Product Updated')
      setIsPending(false)
      setIsOpen(false)
    } catch (error) {
      console.log('error at updating product client', error)
      setIsPending(false)
    }

  }


  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} >
        <Edit className="h-4 w-4" />
        <span className="sr-only">Edit</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>Make changes to the product information.</DialogDescription>
            </DialogHeader>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <FormLabel htmlFor="name" className="text-right">
                        Name
                      </FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input placeholder="Product title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </div>
                  )}
                />
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`prices.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <FormLabel className="text-right">Price {sizeLabels[index]} ($)</FormLabel>
                          <div className="col-span-3">
                            <FormControl>
                              <Input
                                type="number"
                                placeholder={`Price ${index + 1}`}
                                {...field}
                                // Convert string value to number for the form state
                                onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                ))}



                <FormField
                  control={form.control}
                  name="desc"
                  render={({ field }) => (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <FormLabel htmlFor="name" className="text-right">
                        Description
                      </FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Textarea
                            id="description"
                            className="col-span-3"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="img"
                  render={({ field }) => (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="image" className="text-right">
                        Image
                      </Label>
                      <div className="col-span-3">
                        <FormControl>
                          <ImageUpload
                            currentImage={field.value}
                            onImageChange={(value: File | null) => {
                              field.onChange(value)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </div>
                  )}
                />

              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isPending ? 'Saving' : 'Save Changes'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
