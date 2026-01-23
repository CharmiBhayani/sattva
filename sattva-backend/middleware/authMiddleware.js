import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  try {
    // 🔥 READ ENV AT RUNTIME, NOT AT IMPORT TIME
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT VERIFY ERROR:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
