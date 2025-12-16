import "dotenv/config";
import connectDB from "./config/mangodb.js";
import connectCloudinary from "./config/cloudinary.js";
import app from "./app.js";

const port = process.env.PORT || 4000;

// Start server after external services (DB, Cloudinary) are ready
// Start server after external services (DB, Cloudinary) are ready
if (process.env.NODE_ENV !== "test") {
  (async () => {
    try {
      await connectDB();
      await connectCloudinary();
      app.listen(port, () => console.log("Server Started on PORT :" + port));
    } catch (err) {
      console.error("Failed to start server:", err.message);
      process.exit(1);
    }
  })();
}

export { app };