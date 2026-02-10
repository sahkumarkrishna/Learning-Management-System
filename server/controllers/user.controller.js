import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // ✅ Added import
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

// Register new user
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and password are required.",
    });
  }

  // Restrict instructor registration to admin email only
  if (role === "instructor" && email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({
      success: false,
      message: "Instructor registration is restricted.",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "student",
      isVerified: false,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Registration successful!",
      userId: user._id,
    });
  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  try {
    // Check if logging in as instructor with admin credentials
    if (role === "instructor") {
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        // Find or create admin user
        let adminUser = await User.findOne({ email: process.env.ADMIN_EMAIL });
        
        if (!adminUser) {
          const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
          adminUser = await User.create({
            name: "Admin",
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "instructor",
            isVerified: true,
          });
        }
        
        return generateToken(res, adminUser, `Welcome back Admin`);
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid admin credentials.",
        });
      }
    }

    // Regular student login
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    return generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};



export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    // extract public id of the old image from the url is it exists;
    if (user.photoUrl) {
      const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id
      deleteMediaFromCloudinary(publicId);
    }

    // upload new photo
    const cloudResponse = await uploadMedia(profilePhoto.path);
    const photoUrl = cloudResponse.secure_url;

    const updatedData = { name, photoUrl };
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId)
      .select("-password")
      .populate("enrolledCourses");
      
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to retrieve profile" 
    });
  }
};

/** 🚪 LOGOUT */
export const logout = async (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};
