import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: "User not authenticated" 
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    if (!decoded) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid token" 
      });
    }

    req.id = decoded.id;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ 
      success: false,
      message: "Token invalid or expired" 
    });
  }
};

export default isAuthenticated;