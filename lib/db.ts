import mongoose from "mongoose";

interface MongooseGlobal {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseGlobal;
}

global.mongoose = global.mongoose || {
  conn: null,
  promise: null,
};

const MONGODB_URI = process.env.NEXT_DB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

async function dbConnect() {
  if (global.mongoose.conn) {
    console.log("MongoDB is already connected");
    return global.mongoose.conn;
  } else {
    if (!global.mongoose.promise) {
      global.mongoose.promise = mongoose.connect(MONGODB_URI as string);
    }

    global.mongoose.conn = await global.mongoose.promise;
    console.log("Newly connected");
    return global.mongoose.conn;
  }
}

export default dbConnect;