import Link from "next/link";

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
const PaymentSuccessPage = async (props: { params: Params, searchParams: SearchParams }) => {
	const searchParams = await props.searchParams
	const amount = searchParams.amount
	return (
		<main>
			<div className='flex flex-col items-center justify-center h-screen'>
				<h1 className='text-2xl font-bold'>Payment Successful</h1>
				<p className='mt-4'>Thank you for your payment of ${amount}!</p>
				<p className='mt-2'>Your order has been processed successfully.</p>

				<Link href={'/orders'}>
					View Order Details
				</Link>
			</div>
		</main>
	)
}

export default PaymentSuccessPage;