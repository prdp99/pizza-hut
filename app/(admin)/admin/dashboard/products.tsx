import { getProducts } from '@/actions/product'
import ProductCard from './product-card'

interface ProductType {
    _id: string
    title: string
    desc: string
    img: string
}
const Products = async () => {
    const response = await getProducts()
    const { status, message, data } = response

    if (status !== 200) {
        return (
            <div className='flex items-center justify-center w-full h-screen'>
                <h1 className='text-2xl font-bold text-red-500'>{message}</h1>
            </div>
        )
    }


    console.log('Products', response)


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
            {data && (data as unknown as ProductType[]).map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}

        </div>
    )
}

export default Products