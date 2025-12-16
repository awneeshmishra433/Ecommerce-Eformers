import userModel from "../models/userModel.js";

// Add product to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    console.log("addToCart called", { userId, itemId, size });
    const userData = await userModel.findById(userId);
    let cartData = (await userData.cartData) || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    // return updated cart data to client
    const updatedUser = await userModel.findById(userId);
    res.json({ success: true, message: "Product added to cart", cartData: updatedUser.cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update product to user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (quantity <= 0) {
      // remove size
      if (cartData[itemId]) {
        delete cartData[itemId][size];

        // remove product if no sizes left
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      // add/update item
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );

    const updatedUser = await userModel.findById(userId);

    res.json({
      success: true,
      message: "Cart updated",
      cartData: updatedUser.cartData,
    });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user cart Data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("getUserCart called", { userId });
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    res.json({
      success: true,
      cartData: cartData,
      message: "Cart Data Received",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
