import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { Edit } from 'lucide-react'
import { DeleteProductDialog } from './delete-product-dialog'
import { EditProductDialog } from './edit-product-dialog'

const TableAction = (props) => {
  const { product } = props
  const {_id, ...rest} = product
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