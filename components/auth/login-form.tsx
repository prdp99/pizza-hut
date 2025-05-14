'use client'
import useAuth from '@/hooks/use-auth'
import { authClient } from '@/lib/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
// import { signupUser } from '@/actions/auth'

interface LoginFormValues {
    email: string;
    password: string;
}

const formSchema = z
    .object({
        email: z.string().email({ message: 'Invalid email address' }),
        password: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters long' })
            .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
            .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
            .regex(/[0-9]/, { message: 'Password must contain at least one number' })
            .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
    })


const LoginForm = () => {


    const { signin } = useAuth()
    const [pending, setPending] = useState(false)

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(formSchema),
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
        }
    })


    const onSubmit = async (formValues: LoginFormValues) => {

        const { email, password } = formValues

        console.log(formValues)

        await authClient.signIn.email({
            email, // user email address
            password, // user password -> min 8 characters by default
        }, {
            onRequest: () => {
                //show loading
                setPending(true)
            },
            onSuccess: (ctx) => {
                //redirect to the dashboard or sign in page
                setPending(false)
                console.log('success', ctx)
                signin()
            },
            onError: (ctx) => {
                // display the error message
                setPending(false)
                console.log('failed', ctx.error.message)
                toast.error(ctx.error.message)


            },
        });

    }

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="abc@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your password" {...field} type='password' />
                            </FormControl>
                            {/* <FormDescription>*min 6 characters, 1 capital, 1 special character, 1 number</FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Button type="submit" className="w-full">
                    {
                        pending ? 'Loading...' : 'Login'
                    }
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm