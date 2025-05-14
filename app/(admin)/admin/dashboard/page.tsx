import { Suspense } from "react"
import { ProductList } from "./product-list"
import { ProductListSkeleton } from "./product-list-skeleton"
import { getProducts } from "@/actions/product"
import { Product } from "./product-table"

export const dynamic = "force-dynamic"

export default async function DasboardPage() {
  const products = await getProducts()
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your product catalog</p>
        </div>
      </div>

      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList products={products?.data as unknown as Product[]} />
      </Suspense>
    </div>
  )
}
