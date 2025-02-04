import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";
import { purchase } from "../models/purchase.model.js";
import { Course } from "../models/course.model.js";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validate input fields
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ errors: "All fields are required" });
  }

  if (typeof password !== "string" || password.length < 6) {
    return res.status(400).json({ errors: "Password must be a string and at least 6 characters long" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: "User already exists" });
    }

    // Hash the password,PASSWORD MUST BE STRING TO USE BYCRPT
    const hashedPass = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPass
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "Signup succeeded", user: newUser });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ errors: "Internal server error" });
  }
};


export const login = async (req, res) =>{
  const {email,password}  = req.body;

  try {
    const user = await User.findOne({email:email}); 
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
    if(!user || !isPasswordCorrect){
      return res.status(403).json({errors: "Invalid credentials"});
    }

    // jwt code
    const token = jwt.sign({
      id:user._id,
    }, config.JWT_USER_PASSWORD,
    { expiresIn: "1d" }
  );
  const cookieOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    httpOnly: true, //  can't be accsed via js directly
    secure: process.env.NODE_ENV === "production", // true for https only
    sameSite: "Strict", // prevents from CSRF attacks
  };
  res.cookie("jwt", token, cookieOptions);



    res.status(201).json({message: "Login successful", user, token});


  } catch (error) {
    res.status(500).json({errors:"Error in login"});
    console.log("error in login", error);
    
  }
};

export const logout = async(req,res)=>{
  try {
    res.clearCookie("jwt");
  res.status(200).json({message: "Logged out successfully"});
    
  } catch (error) {
    res.status(500).json({erorrs: "Error in logout"});
    console.log("Error in logout", error);
  }

};

export const purchased = async (req, res) => {
  const userId = req.userId;

  try {
    const purchasedd = await purchase.find({ userId });

    let purchasedCourseId = [];

    for (let i = 0; i < purchasedd.length; i++) {
      purchasedCourseId.push(purchasedd[i].courseId);
    }
    const courseData = await Course.find({
      _id: { $in: purchasedCourseId },
    });

    res.status(200).json({ purchasedd, courseData });
  } catch (error) {
    res.status(500).json({ errors: "Error in purchases" });
    console.log("Error in purchase", error);
  }
};

