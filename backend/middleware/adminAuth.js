import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // Accept token either as `token` header or as `Authorization: Bearer <token>`
    let token = req.headers.token || req.headers.authorization;
    if (!token) {
      return res.json({ success: false, message: "Unauthorized Access: token missing" });
    }

    // If header is `Bearer <token>`, strip the prefix
    if (typeof token === "string" && token.toLowerCase().startsWith("bearer ")) {
      token = token.slice(7);
    }

    // Strip surrounding quotes if user pasted the token with quotes
    token = token.replace(/^\"|\"$/g, "").replace(/^'|'$/g, "");

    // Log token for debugging (will appear in server logs)
    console.log("adminAuth: incoming token:", token?.slice(0, 30) + (token?.length > 30 ? "..." : ""));

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("adminAuth: decoded token:", tokenDecode);

    const expected = (process.env.ADMIN_EMAIL || "") + (process.env.ADMIN_PASSWORD || "");
    if (tokenDecode !== expected) {
      return res.json({ success: false, message: "Unauthorized Access: invalid token" });
    }

    next();
    // return res.json({ success: true, message: "Access granted" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
