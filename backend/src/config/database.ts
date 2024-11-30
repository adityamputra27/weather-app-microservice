import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://adityamuhamadputra:RywYFwqFqnfVKylU@cluster0.aoql4.mongodb.net/';

    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default connectDB;