import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      sizes,
      bestseller,
    } = req.body;
    // Validate numeric price (do not accept quoted numbers like '"200"')
    const parsedPrice = parseFloat(price);
    if (!isFinite(parsedPrice)) {
      return res.json({
        success: false,
        message: "Invalid price. Send a numeric value (e.g. 200 or 199.99) without surrounding quotes",
      });
    }

    // Validate sizes (accept either a JSON array string like ["S","M"],
    // a comma-separated string like S,M, or an actual array)
    let sizesArr = [];
    if (sizes) {
      console.log("addProduct: raw sizes value:", sizes, typeof sizes);
      if (Array.isArray(sizes)) {
        sizesArr = sizes;
      } else if (typeof sizes === "string") {
        // Try JSON.parse first
        try {
          const parsed = JSON.parse(sizes);
          if (Array.isArray(parsed)) {
            sizesArr = parsed;
          } else {
            throw new Error("not an array");
          }
        } catch (err) {
          // Clean common quoting issues and try splitting by commas
          const cleaned = sizes.replace(/^\s+|\s+$|^\"|\"$|^'|'$/g, "");
          if (cleaned.startsWith("[") && cleaned.endsWith("]")) {
            try {
              const parsed2 = JSON.parse(cleaned);
              if (Array.isArray(parsed2)) sizesArr = parsed2;
            } catch (err2) {
              // fall through to comma-split
            }
          }
          if (!sizesArr.length) {
            sizesArr = cleaned.split(",").map((s) => s.trim()).filter(Boolean);
          }
        }
      } else {
        return res.json({ success: false, message: 'Invalid sizes format' });
      }

      if (!Array.isArray(sizesArr) || sizesArr.some((s) => typeof s !== "string")) {
        return res.json({ success: false, message: 'Invalid sizes. Send JSON array like ["S","M"] or comma-separated values like S,M' });
      }
    }
    const image1 = req.files.image1?.[0] || null;
    const image2 = req.files.image2?.[0] || null;
    const image3 = req.files.image3?.[0] || null;
    const image4 = req.files.image4?.[0] || null;

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== null
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    // Enforce allowed categories and normalize casing
    const ALLOWED_CATEGORIES = ["fertilizers and pesticides", "Seeds", "Cereal and Vegies"];
    const categoryNormalized = ALLOWED_CATEGORIES.find(
      (c) => String(c).toLowerCase() === String(category || "").toLowerCase()
    );
    if (!categoryNormalized) {
      return res.json({ success: false, message: `Invalid category. Allowed categories: ${ALLOWED_CATEGORIES.join(", ")}` });
    }

    const productData = {
      name,
      description,
      category: categoryNormalized,
      price: parsedPrice,
      bestseller: bestseller === "true" ? true : false,
      sizes: sizesArr,
      image: imagesUrl,
      date: Date.now(),
    };
    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added Successfully." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for list product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const singleProduct = await productModel.findById(productId);
    res.json({ success: true, singleProduct });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
