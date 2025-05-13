'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
// import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
    name: string
    description: string
    price: string
    image: string
}

const UpdatePizza = () => {
    const form = useForm<FormValues>({
        defaultValues: {
            name: '',
            description: '',
            price: '',
            image: ''
        },
    })

    const onSubmit = async (data: FormValues) => {
        console.log('form data', data)
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', data.price)


    }
    return (
        <div className='flex flex-col h-screen px-10 py-10 mx-auto space-y-4'>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel />
                                <FormControl>
                                    { /* Your form field */}
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel />
                                <FormControl>
                                    { /* Your form field */}
                                    <Input placeholder="Description" {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel />
                                <FormControl>
                                    { /* Your form field */}
                                    <Input placeholder="Price" type='number' {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel />
                                <FormControl>
                                    { /* Your form field */}
                                    {/* Upload Icon */}
                                    <>
                                        {
                                            form.getValues('image') ? (
                                                <div className='relative flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary'>
                                                    <img src={URL.createObjectURL(form.getValues('image'))} alt="Pizza" className='object-cover w-full h-full rounded-lg' />

                                                    {/* trashicon */}
                                                    <div className='absolute top-0 right-0 cursor-pointer bg-black rounded-full opacity-70' onClick={() => {
                                                        field.onChange(null) // Update the form state with the selected file
                                                    }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )
                                                :
                                                <div className="flex items-center justify-center  w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary">
                                                    <input
                                                        type="file"
                                                        accept="image/*" // Accept only image files
                                                        className="bg-red-50 w-full h-full cursor-pointer opacity-0 absolute z-1"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0] || null
                                                            console.log('image file', file)
                                                            field.onChange(file) // Update the form state with the selected file
                                                        }}
                                                    />
                                                    <div></div>
                                                    <p className="text-gray-500">Upload Image</p>
                                                </div>
                                        }



                                    </>
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <Button type='submit'>
                        Submit
                        {/* {isPending ? 'Loading...' : 'Login'} */}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default UpdatePizza