import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { Order } from "../models/order.model";
import { Multer } from "multer";
import uploadImageOnCloudinary from "../utils/uploadImage";

export const createRestaurant = async (req: Request, res: Response) => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;


        const restaurant = await Restaurant.findOne({ user: req.id });
        if (restaurant) {
            return res.status(400).json({
                success: false,
                message: "Restaurant already exists for this user."
            })
        }
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required."
            })
        }
        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        await Restaurant.create({
            user: req.id,
            restaurantName,
            city,
            country,
            deliveryTime,
            cuisines: JSON.parse(cuisines),
            imageUrl
        });
        return res.status(201).json({
            success: true,
            message: "Restaurant Added Successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error." })
    }
}

export const getRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findOne({ user: req.id }).populate('menus');
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                restaurant: [],
                message: "Restaurant not found."
            })
        };
        return res.status(200).json({
            success: true,
            restaurant
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error." })
    }
}