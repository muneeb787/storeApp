import Order from "../models/order.js";

export const orderController = {
  createOrder: async (req, res) => {
    try {
      // Extract order data from request body
      const {
        userId,
        products = [
          {
            productId,
            product_name: productName,
            Order_Quantity: quantity,
            product_price: productPrice,
          },
        ],
        transactionId,
        totalPrice,
        product_status,
      } = req.body;
      
      
      // create a new order
      const new_order = await Order.create({
        user_id: userId,
        products: [
          {
            product_id: products[0].productId,
            product_name: products[1].productName,
            Order_Quantity: products[0].Order_Quantity,
            product_price: products[0].price,
          },
          // Add more products as needed in a similar format
        ],
        transaction_id: transactionId,
        totalPrice,
        status: product_status,
      });
      
      
      // send a response
      res
        .status(201)
        .json({ message: "Order Created Successfully.", new_order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Order not created" });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const orderId = req.params.id;
      const {
        userId,
        products = [
          {
            product_id,
            product_name,
            Order_Quantity,
            product_price,
          },
        ],
        transactionId,
        totalPrice,
        product_status,
      } = req.body;
      
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          user_id: userId,
          products: [
            {
              product_id: productId,
              product_name: productName,
              Order_Quantity: quantity,
              product_price: productPrice,
            },
          ],
          transaction_id: transactionId,
          totalPrice: totalPrice,
          status: product_status,
        },
        { new: true }
      );
      if (!updatedOrder) {
        res.status(404).json({ message: "Order not Found" });
      }
      res
        .status(201)
        .json({ message: "Order Updated Successfully", updatedOrder });
    } catch (error) {
      console.error("Error updating Order", error);
      res.status(500).json({ message: "Failed to Update Order" });
    }
  },

  getAllOrder: async (req, res) => {
    try {
      const { id } = req.params;
      // const orderId = req.params.Id;
      const getAllOrder = await Order.findById(id);
      if (!getAllOrder) {
        res.status(404).json({ message: "Order not Found" });
      }
      res.status(200).json({ message: "Order got successfully", getAllOrder });
    } catch (error) {
      console.error("Error fetching orders", error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const orderId = req.params.id;
      const deletedOrder = await Order.findByIdAndRemove(orderId);

      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ message: "Failed to delete order" });
    }
  },
};