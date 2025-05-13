import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { admin ,organization} from "better-auth/plugins"


import dbConnect from "./lib/db"
import mongoose from 'mongoose';
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';


const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASS = process.env.ADMIN_PASSWORD


async function seedAdmin() {
    if (!ADMIN_EMAIL || !ADMIN_PASS) throw Error('ADMIN EMAIL AND PASSWORD IS REQUIRED IN .ENV')

    console.log('script loading', process.env.ADMIN_EMAIL)

    try {

        async function getMongoClient() {
            await dbConnect();
            const client = mongoose.connection.getClient();

            return client;
        }

        const client = await getMongoClient(); // Get the shared MongoClient instance
        const db = client.db(); // Access the database

        const adminExist = await db.collection('user').findOne({ email: ADMIN_EMAIL })



        if (!adminExist) {
            console.log('ADMIN DOES NOT EXIST!')
            // const admin = await db.collection('user').insertOne({
            //     name: 'Admin',
            //     email: ADMIN_EMAIL,
            //     pas
            // })
            const auth = betterAuth({
                database: mongodbAdapter(db),
                emailAndPassword: {
                    enabled: true
                },
                plugin: [admin(), organization()],
            });

            const adminS = await auth.api.signUpEmail({
                body: {
                    name: 'Admin',
                    email: ADMIN_EMAIL,
                    password: ADMIN_PASS,
                    // @ts-ignore
                    role: 'amdin'
                }
            })

            console.log('admin created ', adminS)

        }
        console.log('ADMIN DETAILS:', adminExist)
        process.exit(0)

    } catch (error) {
        console.log('ERRO AT SEED AMIN', error)

    }
}

seedAdmin()