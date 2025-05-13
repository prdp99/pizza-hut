import { getProductById } from '@/actions/product'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import ProductSize from './size'
import ProductPrice from './price'
import AddToCart from './add-to-cart'

type ProductPageProps = {
    params: {
        id: string
    }
}

const SIZES_OPTIONS = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
]

const ProductPage = async ({ params }: ProductPageProps) => {
    const productId = params?.id
    const response = await getProductById(productId)



    if (!response || response.status !== 200) {
        notFound() // Redirect to a 404 page if the product is not found
    }

    const { data: product } = response



    return (
        <div className="p-8 pb-25 flex justify-between bg-black text-white">
            <div className='flex-1 flex justify-center items-center'>
                <Image src={product.img} alt={product.title} width={500} height={500} />
            </div>
            <div className='flex-1 flex flex-col gap-3'>
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <p className="text-md">{product.desc}</p>
                <ProductPrice prices={product.prices} />

                <div>
                    <h2 className="text-xl font-bold ">Choose the size</h2>
                    <div className='flex gap-4'>
                        {SIZES_OPTIONS.map((option) => (
                            <ProductSize key={option.value} size={option.value} />
                        ))}
                    </div>

                </div>
                <AddToCart  productId={product.id} prices={product.prices} />

            </div>
        </div>
    )
}

export default ProductPage