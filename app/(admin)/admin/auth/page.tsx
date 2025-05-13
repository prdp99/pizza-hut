'use client'
import { loginAdmin } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import React, {  useState } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
    username: string
    password: string
}

const AdminPage = () => {
    const router = useRouter()

    const form = useForm<FormValues>({
        defaultValues: {
            username: '',
            password: ''
        },
    })

    const [isPending, setIsPending] = useState(false)

    


    const onSubmit = async (data: { username: string, password: string }) => {
        console.log(data)
        setIsPending(true)

        await loginAdmin(data).then((res) => {
            console.log('suces',res)
            router.push('/admin/dashboard')
            
        }).catch((err) => {
            console.log('error occured',err)
            form.setError('username', { message: err.message })
            form.setError('password', { message: err.message })
        })
        setIsPending(false)
    }
    console.log('form errors', form.formState.errors)

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-2xl font-bold'>Admin Login</h1>
            <div className='h-2' />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel />
                                <FormControl>
                                    { /* Your form field */}
                                    <Input placeholder="Username" {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage  />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel />
                                <FormControl>
                                    { /* Your form field */}
                                    <Input placeholder="password" {...field} type='password' />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <Button type='submit'>
                        {isPending ? 'Loading...' : 'Login'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default AdminPage