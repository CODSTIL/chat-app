import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const userSignup = async (req, res) => {
  const { fullname, username, password, confirmPassword, gender,email } =
    req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  if (
    !username ||
    !password ||
    !fullname ||
    !gender ||
    !email ||
    !confirmPassword
  ) {
    return res
      .status(400)
      .json({ message: "Please provide username, email, and password." });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    // profile pic api https://avatar.iran.liara.run/public

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const boyprofilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlprofilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      email,
      gender,
      profilePic: gender === "male" ? boyprofilePic : girlprofilePic,
      password: hashPassword,
    });

    if (newUser) {
      // generate new Token
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser.id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic,
        success: true,
        message: "User registered successfully.",
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.error("Sign up Error :", error);
    res.status(500).json({ message: "Server error during signup." });
  }
};

const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide username and password.' });
        }

        // Find user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Generate token and set cookie
        const token = generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id:user.id,
            fullname:user.fullname,
            username:user.username,
            profilePic:user.profilePic,
            token, 
            message: 'Logged in successfully.' 
        });

    }catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Server error during login." });
    }

};

const userLogout = (req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged out succesfully"})
    
  } catch (error) {
    console.error("Logout Error:", error.message);
    res.status(500).json({ message: "Server error during Logout." });
}

};

export { userSignup, userLogin, userLogout };
