import mongoose from "mongoose";

interface MongooseGlobal {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}


declare global {
  let mongoose: MongooseGlobal;
}

// @ts-expect-error error
global.mongoose = global.mongoose || {
  conn: null,
  promise: null,
};

const MONGODB_URI = process.env.NEXT_DB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

async function dbConnect() {
  // @ts-expect-error error
  if (global.mongoose.conn) {
    console.log("MongoDB is already connected");
    // @ts-expect-error error

    return global.mongoose.conn;
  } else {
    // @ts-expect-error error

    if (!global.mongoose.promise) {
      // @ts-expect-error error

      global.mongoose.promise = mongoose.connect(MONGODB_URI as string);
    }
    // @ts-expect-error error

    global.mongoose.conn = await global.mongoose.promise;
    console.log("Newly connected");
  // @ts-expect-error error
    return global.mongoose.conn;
  }
}

export default dbConnect;