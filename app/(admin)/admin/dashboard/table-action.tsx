import { TableCell } from '@/components/ui/table'
import { DeleteProductDialog } from './delete-product-dialog'
import { EditProductDialog } from './edit-product-dialog'
import { Product } from './product-table'

interface TableActionProps {
  product: Product
}

const TableAction = (props: TableActionProps) => {
  const { product } = props
  const { _id, ...rest } = product
  return (
    <TableCell className="text-right">
      <div className="flex justify-end">

        <EditProductDialog productId={_id.toString()} product={rest} />
        <DeleteProductDialog productId={product._id.toString()} title={product.title} />
      </div>
    </TableCell>
  )
}

export default TableAction