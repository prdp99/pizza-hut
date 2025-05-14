'use client'

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckPage from './check-page';


import { convertToSubcurrency } from '@/lib/stripe-helper';
import { useState } from 'react';
import Modal from '@/components/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from '@/lib/auth-client';

const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!STRIPE_PUBLIC_KEY) {
    throw new Error('Missing Stripe public key in environment variables. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.');
}

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY!);

interface CheckoutFormProps {
    amount: number
}

const formSchema = z
    .object({
        customerName: z.string().min(3, { message: 'min 3 letters' }),
        customerAddress: z.string().min(3, { message: 'min 3 letters' }),
        customerPhone: z.string().min(10, { message: 'must be 10 dig' }),
        customerDescription: z.string().optional(),
    })

type formType = z.infer<typeof formSchema>
const CheckoutForm = ({ amount }: CheckoutFormProps) => {
    const [isCheckoutReady, setIsCheckoutReady] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const { data: session } = authClient.useSession()



    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: 'onBlur',
        defaultValues: {
            customerName: '',
            customerAddress: '',
            customerDescription: ''
        }
    })

    const formValues = form.watch()



    const onSubmit = async (formValues: formType) => {
        console.log('formValues', formValues)
        setIsFormSubmitted(true)

    }

    return (
        <div >
            <button
                onClick={() => setIsCheckoutReady(true)}
                className="w-full mt-6 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300">
                Proceed to Checkout
            </button>


            <Modal
                isOpen={isCheckoutReady || isFormSubmitted}
                onClose={() => {
                    setIsFormSubmitted(false)
                    setIsCheckoutReady(false)
                }}
                title="Payment Details"
                description="Please enter your payment information below."

            >

                {!isFormSubmitted &&
                    <Form {...form}>
                        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="customerName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="customerAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="customerPhone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Phone" {...field}

                                                type="tel"
                                                pattern="[0-9]*"
                                                inputMode="numeric"
                                                onKeyPress={(e) => {
                                                    if (!/[0-9]/.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="customerDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type='submit'
                                className="bg-red-600 text-white hover:bg-red-700"
                            >
                                proceed to payment
                            </Button>
                        </form>

                    </Form>
                }


                {isFormSubmitted && session?.user?.id &&
                    <Elements
                        stripe={stripePromise}
                        options={{
                            mode: 'payment',
                            amount: convertToSubcurrency(amount),
                            currency: 'usd',
                        }}
                    >
                        {/* @ts-expect-error error */}
                        <CheckPage amount={amount} orderDetails={formValues} userId={session?.user?.id} />
                    </Elements>
                }

            </Modal>



        </div>
    )
}

export default CheckoutForm