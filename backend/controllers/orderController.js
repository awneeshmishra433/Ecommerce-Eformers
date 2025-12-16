import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import Stripe from "stripe";
import razorpay from "razorpay";

// Global variables
const currency = "inr";
const deliveryCharge = 40;

// Helper: compute unit price for a product given a chosen size string
const computeUnitPrice = (product, sizeStr) => {
  try {
    if (!product) return 0;
    const parseSizeNumeric = (s) => {
      if (!s) return null;
      const m = String(s).match(/[0-9]+(?:\.[0-9]+)?/);
      return m ? parseFloat(m[0]) : null;
    };
    const numeric = parseSizeNumeric(sizeStr);
    if (product.pricePerKg && numeric) {
      return product.pricePerKg * numeric;
    }
    const sizesNumeric = (product.sizes || [])
      .map(parseSizeNumeric)
      .filter(Boolean)
      .sort((a, b) => a - b);
    const smallest = sizesNumeric && sizesNumeric.length > 0 ? sizesNumeric[0] : null;
    if (smallest && product.price && numeric) {
      const pricePerUnit = product.price / smallest;
      return pricePerUnit * numeric;
    }
    return product.price || 0;
  } catch (err) {
    console.log('computeUnitPrice error', err.message);
    return product.price || 0;
  }
};

// Gateway Initialize (defensive - allow server to run without keys)
let stripe = null;
let razorpayInstance = null;
try {
  if (process.env.STRIPE_SECRET_KEY) stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} catch (err) {
  console.warn("Stripe init skipped:", err.message);
}
try {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpayInstance = new razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
} catch (err) {
  console.warn("Razorpay init skipped:", err.message);
}

// Placing Order using COD Method
const placeOrder = async (req, res) => {
  try {
    console.log("placeOrder called", { bodySnippet: { items: (req.body.items || []).length, amount: req.body.amount } });
    const { userId, items = [], amount: clientAmount, address } = req.body;

    // Recompute item prices server-side for security and correctness
    let serverItems = [];
    let serverSubtotal = 0;

    for (const it of items) {
      const productId = it._id || it.id || it.productId;
      const product = await productModel.findById(productId).lean();
      const unitPrice = computeUnitPrice(product || it, it.size);
      const quantity = it.quantity || 1;
      serverItems.push({
        _id: productId,
        name: (product && product.name) || it.name,
        size: it.size,
        quantity,
        price: Number(unitPrice.toFixed(2)),
      });
      serverSubtotal += unitPrice * quantity;
    }

    const discountPercent = (req.body.discount && Number(req.body.discount)) || 0;

    // Apply discount to subtotal and then add deliveryCharge
    let serverAmount = Math.round((serverSubtotal - (serverSubtotal * discountPercent/100) + deliveryCharge) * 100) / 100;

    const orderData = {
      userId,
      items: serverItems,
      subtotal: Math.round(serverSubtotal * 100) / 100,
      discount: discountPercent,
      couponCode: req.body.couponCode || "",
      address,
      amount: serverAmount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing Order using Stripe Method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items = [], amount: clientAmount, address } = req.body;
    const { origin } = req.headers;

    // Recompute items & amount on server
    let serverItems = [];
    let serverSubtotal = 0;

    for (const it of items) {
      const productId = it._id || it.id || it.productId;
      const product = await productModel.findById(productId).lean();
      const unitPrice = computeUnitPrice(product || it, it.size);
      const quantity = it.quantity || 1;
      serverItems.push({
        _id: productId,
        name: (product && product.name) || it.name,
        size: it.size,
        quantity,
        price: Number(unitPrice.toFixed(2)),
      });
      serverSubtotal += unitPrice * quantity;
    }

    const discountPercent = (req.body.discount && Number(req.body.discount)) || 0;
    let serverAmount = Math.round((serverSubtotal - (serverSubtotal * discountPercent/100) + deliveryCharge) * 100) / 100;

    const orderData = {
      userId,
      items: serverItems,
      subtotal: Math.round(serverSubtotal * 100) / 100,
      discount: discountPercent,
      couponCode: req.body.couponCode || "",
      amount: serverAmount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
      address,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = serverItems.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: Math.round(deliveryCharge * 100),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({
      success: true,
      session_url: session.url,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Verify Stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing Order using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items = [], amount: clientAmount, address } = req.body;

    // Recompute items & amount on server
    let serverItems = [];
    let serverAmount = 0;

    for (const it of items) {
      const productId = it._id || it.id || it.productId;
      const product = await productModel.findById(productId).lean();
      const unitPrice = computeUnitPrice(product || it, it.size);
      const quantity = it.quantity || 1;
      serverItems.push({
        _id: productId,
        name: (product && product.name) || it.name,
        size: it.size,
        quantity,
        price: Number(unitPrice.toFixed(2)),
      });
      serverAmount += unitPrice * quantity;
    }

    serverAmount = Math.round((serverAmount + deliveryCharge) * 100) / 100;

    const orderData = {
      userId,
      items: serverItems,
      amount: serverAmount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
      address,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: Math.round(serverAmount * 100),
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Payment successful" });
    } else {
      // await orderModel.findByIdAndDelete(orderInfo.receipt);
      res.json({ success: true, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// All Orders Data for Admin Pannel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User Orders Data for Frontend
const usersOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Order Status from Admin Pannel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order Status updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  usersOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay,
};