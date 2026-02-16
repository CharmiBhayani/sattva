import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async(req,res)=>{
    try{
        const { name, email, password } = req.body;

if (!name || !email || !password) {
  return res.status(400).json({ message: "All fields are required" });
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return res.status(400).json({ message: "Enter a valid email" });
}

if (password.length < 6) {
  return res.status(400).json({ message: "Password must be at least 6 characters" });
}

const normalizedEmail = email.toLowerCase();

const userExists = await User.findOne({ email: normalizedEmail });
if (userExists) {
  return res.status(400).json({ message: "Email already registered" });
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
  name,
  email: normalizedEmail,
  password: hashedPassword,
});

const { password: _, ...userWithoutPassword } = user._doc;

res.status(201).json({
  message: "Signup Successful",
  user: userWithoutPassword,
});

    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

export const login = async (req,res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: "User not found"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message: "Wrong Password"});
        console.log("JWT_SECRET IN LOGIN:", process.env.JWT_SECRET);

        const token = jwt.sign(
            {id:user._id,email:user.email,role: user.role,},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );
        res.json({message: "Login successful",token,user});
    } catch(error){
        res.status(500).json({message: error.message});
    }
};