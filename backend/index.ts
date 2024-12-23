import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from './db/connectDB';
import userRoute from "./routes/user.route";
import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";
import path from "path";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { fetchAllRestaurants } from "./controller/restaurant.controller";
import { fetchAllMenus } from "./controller/menu.controller";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const DIRNAME = path.resolve();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true
}
app.use(cors(corsOptions));


app.use("/api/user", userRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/menu", menuRoute);
app.use("/api/order", orderRoute);

app.get("/api/restaurants",isAuthenticated,fetchAllRestaurants);
app.get("/api/menus",isAuthenticated,fetchAllMenus);

app.use(express.static(path.join(DIRNAME, "/frontend/dist")));
app.use("*", (_, res) => {
    res.sendFile(path.resolve(DIRNAME, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at port ${PORT}`);
});