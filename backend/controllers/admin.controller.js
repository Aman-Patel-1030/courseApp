import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import config from "../config.js";
import { Admin } from "../models/admin.model.js";

export const signup = async (req, res) => {
  console.log("Signup request received:", req.body); // Debugging
  
  const { firstName, lastName, email, password } = req.body;

  // Validation Schema
  const adminSchema = z.object({
    firstName: z
      .string()
      .min(3, { message: "First name must be at least 3 characters long" }),
    lastName: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  });

  const validatedData = adminSchema.safeParse(req.body);
  if (!validatedData.success) {
    return res.status(400).json({
      errors: validatedData.error.issues.map((err) => err.message),
    });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ errors: ["Admin already exists"] });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: "Signup successful", admin: newAdmin });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ errors: ["Internal Server Error"] });
  }
};

export const login = async (req, res) => {
  console.log("Login request received:", req.body); // Debugging

  const { email, password } = req.body;

  // Ensure email and password are provided
  if (!email || !password) {
    return res.status(400).json({ errors: ["Email and Password are required"] });
  }

  try {
    const admin = await Admin.findOne({ email });

    // If no admin found, return an error
    if (!admin) {
      return res.status(403).json({ errors: ["Invalid credentials"] });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ errors: ["Invalid credentials"] });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id },
      config.JWT_ADMIN_PASSWORD,
      { expiresIn: "1d" }
    );

    // Cookie options
    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    };

    res.cookie("jwt", token, cookieOptions);
    res.status(200).json({ message: "Login successful", admin, token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ errors: ["Internal Server Error"] });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ errors: ["Internal Server Error"] });
  }
};
