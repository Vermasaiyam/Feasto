import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from './db/ConnectDB';
import userRoute from "./routes/user.route";
import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions));


app.use("/api/user", userRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/menu", menuRoute);
app.use("/api/order", orderRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at port ${PORT}`);
});