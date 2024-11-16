import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { Order } from "../models/order.model";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type CheckoutSessionRequest = {
    cartItems: {
        menuId: string;
        name: string;
        image: string;
        price: number;
        quantity: number
    }[],
    deliveryDetails: {
        name: string;
        email: string;
        address: string;
        city: string
    },
    restaurantId: string
}

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({ user: req.id }).populate('user').populate('restaurant');
        return res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const checkoutSessionRequest: CheckoutSessionRequest = req.body;
        console.log("Checkout Session Request:", checkoutSessionRequest);

        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId).populate("menus");
        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found." });
        }

        const menuItems = restaurant.menus;
        console.log("Menu Items from Restaurant:", menuItems);

        const invalidCartItems = checkoutSessionRequest.cartItems.filter(
            (cartItem) => !menuItems.some((menuItem: any) => menuItem._id.toString() === cartItem.menuId)
        );
        if (invalidCartItems.length > 0) {
            console.error("Invalid Cart Items:", invalidCartItems);
            return res.status(400).json({
                success: false,
                message: "Invalid menu items in the cart.",
                invalidCartItems,
            });
        }

        const order: any = new Order({
            restaurant: restaurant._id,
            user: req.id,
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems,
            status: "pending",
        });

        const lineItems = createLineItems(checkoutSessionRequest, menuItems);
        console.log("Generated Line Items:", lineItems);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: { allowed_countries: ['GB', 'US', 'CA'] },
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/order/status`,
            cancel_url: `${process.env.FRONTEND_URL}/cart`,
            metadata: {
                orderId: order._id.toString(),
                images: JSON.stringify(menuItems.map((item: any) => item.image)),
            },
        });

        if (!session.url) {
            return res.status(400).json({ success: false, message: "Error creating the Stripe session." });
        }

        await order.save();
        console.log("Order saved successfully:", order);

        return res.status(200).json({ session });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error creating checkout session:", error.message, error.stack);
            return res.status(500).json({ message: "Internal server error.", error: error.message });
        } else {
            console.error("Unknown error:", error);
            return res.status(500).json({ message: "An unknown error occurred." });
        }
    }
    
};

export const stripeWebhook = async (req: Request, res: Response) => {
    let event;

    try {
        const signature = req.headers["stripe-signature"];

        // Construct the payload string for verification
        const payloadString = JSON.stringify(req.body, null, 2);
        const secret = process.env.WEBHOOK_ENDPOINT_SECRET!;

        // Generate test header string for event construction
        const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret,
        });

        // Construct the event using the payload string and header
        event = stripe.webhooks.constructEvent(payloadString, header, secret);
    } catch (error: any) {
        console.error('Webhook error:', error.message);
        return res.status(400).send(`Webhook error: ${error.message}`);
    }

    // Handle the checkout session completed event
    if (event.type === "checkout.session.completed") {
        try {
            const session = event.data.object as Stripe.Checkout.Session;
            const order = await Order.findById(session.metadata?.orderId);

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            // Update the order with the amount and status
            if (session.amount_total) {
                order.totalAmount = session.amount_total;
            }
            order.status = "confirmed";

            await order.save();
        } catch (error) {
            console.error('Error handling event:', error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    // Send a 200 response to acknowledge receipt of the event
    res.status(200).send();
};


export const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: any) => {
    // 1. create line items
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item: any) => item._id.toString() === cartItem.menuId);
        if (!menuItem){
            console.error(`Menu Item not found for menuId: ${cartItem.menuId}`);
            throw new Error(`Menu Item id not found for menuId: ${cartItem.menuId}`);
        }

        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: menuItem.name,
                    images: [menuItem.image],
                },
                unit_amount: menuItem.price * 100
            },
            quantity: cartItem.quantity,
        }
    })
    // 2. return lineItems
    return lineItems;
}