import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import connectDB from './db/ConnectDB';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('mongoDB connected successfully.');
    } catch (error) {
        console.log(error);
    }
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at port ${PORT}`);
});