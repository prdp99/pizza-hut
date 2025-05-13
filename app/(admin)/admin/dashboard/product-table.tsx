import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import TableAction from './table-action'

const ProductTable = ({ products }) => {
    return (
        <div className="rounded-md border bg-white shadow-sm">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Small</TableHead>
                            <TableHead>Medium </TableHead>
                            <TableHead>Large</TableHead>
                            {/* <TableHead>Status</TableHead> */}
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products?.map((product) => (
                            <TableRow key={product._id} className="hover:bg-gray-50">
                                <TableCell>
                                    <div className="relative h-16 w-16 overflow-hidden rounded-md">
                                        <Image
                                            src={product.img || "/img/pizza.png"}
                                            alt={product.title}
                                            fill
                                            className="object-cover"
                                            sizes="64px"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{product.title}</TableCell>
                                <TableCell>${Number(product.prices[0]).toFixed(2)}</TableCell>
                                <TableCell>${Number(product.prices[1]).toFixed(2)}</TableCell>
                                <TableCell>${Number(product.prices[2]).toFixed(2)}</TableCell>
                                {/* <TableCell>
                                    <Badge
                                        variant={product.active ? "default" : "outline"}
                                        className={
                                            product.status
                                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                        }
                                    >
                                        {product.active ? "Active" : "Inactive"}
                                    </Badge>
                                </TableCell> */}
                                <TableAction product={product} />
                            </TableRow>))}

                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ProductTable