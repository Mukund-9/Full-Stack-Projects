import mongoose from "mongoose";
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://localhost:27017/Paper-helper`, {
      useNewUrlParser: true,


    });
  } catch (error) {
    process.exit(1);
  }
}
export default connectDb;