import mongoose from "mongoose";

 const uri = "mongodb://127.0.0.1:27017/task-mangement-app"
export const connectDB = async () => {
    try {
     
      await mongoose.connect(uri);
      console.log("Database connected");
    } catch (error) {
      console.log("Error connecting to database", error);
    }
}


export default connectDB