import { DB_Name } from "../constants.js";
import mongoose from "mongoose";


const connectDB = (async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
        console.log("\n MONGODB Connected : ", connection.connection.host)
    } catch (error) {
        console.log("\n MONGODB Connected : ", connection.connection.host);
    }
})


export default connectDB