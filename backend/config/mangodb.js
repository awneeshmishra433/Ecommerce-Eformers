import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB Connected");
  });
  const uri = process.env.MONGODB_URI || process.env.MANGODB_URI;
  if (!uri) {
    throw new Error(
      'Missing environment variable MONGODB_URI. Add a .env file with a valid MongoDB connection string that starts with "mongodb://" or "mongodb+srv://"'
    );
  }

  await mongoose.connect(`${uri}/ecommerce`);
};

export default connectDB;