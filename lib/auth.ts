import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dbConnect from "./db"; 
import mongoose from "mongoose";
import { nextCookies } from "better-auth/next-js";
import { admin ,organization} from "better-auth/plugins"

async function getMongoClient() {
  await dbConnect();
  const client = mongoose.connection.getClient();
  return client;
}

const client = await getMongoClient(); 
export const db = client.db(); 

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true
  },
  plugin: [nextCookies(),admin(),organization()],
});

