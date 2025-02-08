import express from 'express'
import User from '../models/userModels.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const SECRET_KEY = 'RAHADLKASLFJSLKFJASFKSJFLKSJFSA43534LJLKSJ'; // Fix name

// 01 : Create User (Signup)
router.post('/create', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Fill all the input" });
        }

        const existUser = await User.findOne({ email });
        if (existUser) return res.status(400).json({ success: false, message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPass });
        await newUser.save();

        // Generate JWT Token
        const token = jwt.sign({ id: newUser._id, name: newUser.name, email: newUser.email }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ success: true, message: "User created successfully", user: { name: newUser.name, email: newUser.email }, token });

    } catch (error) {
        res.status(500).json({ success: false, message: "User creation failed" });
        console.error(error);
    }
});

// 02 : Login User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Fill all the input" });
        }

        const existUser = await User.findOne({ email });
        if (!existUser) return res.status(400).json({ success: false, message: "Unauthorized credentials" });

        const comparePass = await bcrypt.compare(password, existUser.password);
        if (!comparePass) return res.status(400).json({ success: false, message: "Unauthorized credentials" });

        // Generate JWT Token
        const token = jwt.sign({ id: existUser._id, name: existUser.name, email: existUser.email }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ success: true, message: `Welcome ${existUser.name}`, user: { name: existUser.name, email: existUser.email }, token });

    } catch (error) {
        res.status(500).json({ success: false, message: "Login failed" });
        console.error(error);
    }
});

// 03 : Verify Token (Auto Login)
router.get("/verify-token", async (req, res) => {
    try {
        let token = req.headers["authorization"];

        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        // Remove 'Bearer ' if it exists
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) return res.status(401).json({ success: false, message: "Invalid token" });

        res.status(200).json({ success: true, user });

    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
});

// 04 : Delete User
router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body;

        const deleteUser = await User.findByIdAndDelete(id);
        if (!deleteUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: `Dear ${deleteUser.name}, your account was deleted successfully` });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete user" });
        console.error(error);
    }
});

export default router;
