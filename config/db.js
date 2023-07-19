import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      userNewUrlPaser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
    });

    console.log(`Mongodb Connect: ${con.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;