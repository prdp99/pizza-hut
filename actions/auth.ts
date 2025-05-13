'use server'

import { auth } from "@/lib/auth"
import User from "@/models/User"

type adminType = {
    username: string
    password: string
}

export async function loginAdmin(params: adminType) {
    const { username, password } = params
    console.log(username, password, process.env.NEXT_ADMIN_USERNAME)

    if (!username || !password) {
        throw new Error('Username and password are required')
    }

    if (username === process.env.NEXT_ADMIN_USERNAME && password === process.env.NEXT_ADMIN_PASSWORD) {
        return true
    }

    throw new Error('Invalid username or password')
}


type userType = {
    email: string
    password: string
}

export async function signupUser(params: userType) {
    const { email, password } = params
    console.log(email, password)

    try {
        if (!email || !password) {
            return {
                status: 422,
                message: 'Email and password are required',
                data: null
            }
        }


        // const user = await User.findOne({ email })
        // if (user) {
        //     return {
        //         status: 422,
        //         message: 'User already exists',
        //         data: null
        //     }
        // }

        // const newUser = await User.create({ email, password })

        // if (!newUser) {
        //     return {
        //         status: 422,
        //         message: 'User creation failed',
        //         data: null
        //     }
        // }
        // return {
        //     status: 200,
        //     message: 'User created successfully',
        //     data: newUser
        // }

        const res = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: 'User'
            }
        })
        console.log('res  from betterauth serverside========', res)

        return {
            status: 200,
            message: 'User created successfully',
            data: res
        }



    } catch (error) {
        console.log('server',error)
        return {
            status: 500,
            message: 'Internal server error',
            data: null
        }

    }

}

