'use client'
import { authClient } from '@/lib/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import useAuth from '@/hooks/use-auth'
// import { signupUser } from '@/actions/auth'

interface SignupFormValues {
    email: string;
    password: string;
    confirmPassword: string;
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
        confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'], // This will attach the error to the confirmPassword field
    });

const SignupForm = () => {

    const { setIsOpen } = useAuth()

    // const router = useRouter()
    const [pending, setPending] = useState(false)
    const form = useForm<SignupFormValues>({
        resolver: zodResolver(formSchema),
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        }
    })



    const onSubmit = async (formValues: SignupFormValues) => {

        const { email, password } = formValues

        console.log(formValues)

        await authClient.signUp.email({
            email, // user email address
            password, // user password -> min 8 characters by default
            name: 'User', // user display name
            image: ''
        }, {
            onRequest: () => {
                //show loading
                setPending(true)
            },
            onSuccess: (ctx) => {
                //redirect to the dashboard or sign in page
                console.log('success', ctx)
                setPending(false)
                setIsOpen(false)
            },
            onError: (ctx) => {
                // display the error message
                console.log('failed', ctx.error.message)
                toast.error(ctx.error.message)
                setPending(false)
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your password " {...field} type='password' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    {
                        pending ? 'Loading...' : 'Signup'
                    }
                </Button>
            </form>
        </Form>
    )
}

export default SignupForm