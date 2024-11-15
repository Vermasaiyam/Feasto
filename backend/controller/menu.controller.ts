import { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/uploadImage";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import mongoose, { ObjectId } from "mongoose";

export const addMenu = async (req: Request, res: Response) => {
    try {
        const { name, description, price } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            })
        };
        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

        const restaurant = await Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            res.status(404).json({
                success: false,
                message: "Restaurant not found for this user."
            });
            return;
        }

        const menu: any = await Menu.create({
            name,
            description,
            price,
            image: imageUrl,
            restaurantId: restaurant._id,
            restaurantName: restaurant.restaurantName,
        });
        if (restaurant) {
            (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id);
            await restaurant.save();
        }

        return res.status(201).json({
            success: true,
            message: "Menu Added Successfully.",
            menu
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
}

export const editMenu = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const file = req.file;
        const menu = await Menu.findById(id);
        if (!menu) {
            return res.status(404).json({
                success: false,
                message: "Menu not found!!!"
            })
        }
        if (name) menu.name = name;
        if (description) menu.description = description;
        if (price) menu.price = price;

        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            menu.image = imageUrl;
        }
        await menu.save();

        return res.status(200).json({
            success: true,
            message: "Menu updated",
            menu,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
}

export const deleteMenu = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.id;


        const menu = await Menu.findById(id);
        if (!menu) {
            return res.status(404).json({
                success: false,
                message: "Menu not found!!!"
            });
        }

        
        const restaurant = await Restaurant.findById(userId);
        if (restaurant) {
            restaurant.menus = (restaurant.menus as mongoose.Schema.Types.ObjectId[])
                .filter((menuId) => menuId.toString() !== id) as mongoose.Schema.Types.ObjectId[];
            await restaurant.save();
        }

        await Menu.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Menu deleted successfully."
        });
    } catch (error) {
        // console.error("Error deleting menu:", error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
};

export const fetchAllMenus = async (req: Request, res: Response) => {
    try {
        const menu = await Menu.find();

        if (!menu) {
            return res.status(404).json({
                success: false,
                menu: [],
                message: "No Menus found."
            });
        }

        return res.status(200).json({
            success: true,
            menu
        });
    } catch (error) {
        return res.status(500).json({ message: error || "Internal Server Error." });
    }
};