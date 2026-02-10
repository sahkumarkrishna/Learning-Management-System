import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  try {
    if (!process.env.SECRET_KEY) {
      console.error("Error: SECRET_KEY is missing!");
      return res.status(500).json({
        success: false,
        message: "Server configuration error. Try again later.",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          photoUrl: user.photoUrl,
          enrolledCourses: user.enrolledCourses,
        },
        token,
      });
  } catch (error) {
    console.error("Error generating token:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate token.",
    });
  }
};