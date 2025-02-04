import { Order } from "../models/order.model.js";
import { purchase } from "../models/purchase.model.js";

// export const orderData = async (req, res) => {
//   const order = req.body;
//   try {
//     const orderInfo = await Order.create(order);
//     console.log(orderInfo);
//     const userId = orderInfo?.userId;
//     const courseId = orderInfo?.courseId;
//     res.status(201).json({ message: "Order Details: ", orderInfo });
//     if (orderInfo) {
//       await purchase.create({ userId, courseId });
//     }
//   } catch (error) {
//     console.log("Error in order: ", error);
//     res.status(401).json({ errors: "Error in order creation" });
//   }
// };

export const orderData = async (req, res) => {
  const order = req.body;
  console.log("Received order data:", order); // Debugging log

  try {
    const orderInfo = await Order.create(order);
    console.log("Order created successfully:", orderInfo);

    const userId = orderInfo?.userId;
    const courseId = orderInfo?.courseId;

    if (!userId || !courseId) {
      console.log("Missing userId or courseId in orderInfo");
      return res.status(400).json({ error: "Invalid order data" });
    }

    await purchase.create({ userId, courseId });
    console.log("Purchase record created successfully.");

    res.status(201).json({ message: "Order created", orderInfo });

  } catch (error) {
    console.log("Error in order creation:", error);
    res.status(500).json({ errors: "Error in order creation" });
  }
};
