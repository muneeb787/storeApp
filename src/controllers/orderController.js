import Order from "../models/order.js";

export const orderController = {
  createOrder: async (req, res) => {
    try {
      // Extract order data from request body
      const user_id = req.user._id
      // console.log(req.body);
      console.log(user_id , "useruseruseruseruseruser")
      const data = req.body;
      data.user_id = user_id;

      data.user_id = user_id;

      console.log(data)
      // create a new order
      const new_order = await Order.create(data);

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
      const data = req.body;
      const updatedOrder = await Order.findByIdAndUpdate(orderId, data, {
        new: true,
      });
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

  getSingleOrder: async (req, res) => {
    try {
      const { id } = req.params;
      // const orderId = req.params.Id;
      const getSingleOrder = await Order.findById(id);
      if (!getSingleOrder) {
        res.status(404).json({ message: "Order not Found" });
      }
      res
        .status(200)
        .json({ message: "Order got successfully", getSingleOrder });
    } catch (error) {
      console.error("Error fetching orders", error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  },
  getAllOrder: async (req, res) => {
    try {
      const getAllOrder = await Order.find();
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
