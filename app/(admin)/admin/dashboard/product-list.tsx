
import { AddProductDialog } from "./add-product-dialog"
import ProductTable, { Product } from "./product-table"

interface PropductListProps {
  products: Product[]
}

export function ProductList({ products }:PropductListProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        {/* <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search products..."
            className="pl-10"
          />
        </div> */}
       
        <AddProductDialog />

      </div>

      <ProductTable products={products} />

      {/* <div className="text-sm text-gray-500 mt-2">
        Showing {filteredProducts.length} of {products.length} products
      </div> */}


      {/* {selectedProduct && (
        <>
          <EditProductDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            product={selectedProduct}
            onEdit={handleEditProduct}
          />
          <DeleteProductDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            product={selectedProduct}
            onDelete={() => handleDeleteProduct(selectedProduct.id)}
          />
        </>
      )} */}
    </div>
  )
}
