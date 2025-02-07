import express from 'express'
import User from '../models/userModels.js';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// 01 : create user

const SECRETE_KEY = 'RAHADLKASLFJSLKFJASFKSJFLKSJFSA43534LJLKSJ';

router.post('/create', async (req, res) => {


    try {

        // import in body 
        const { name, email, password } = req.body;


        // check input is filled or not 
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Fill all the input" });
        }

        // chack is email is exist or not 
        const existUser = await User.findOne({ email })
        if (existUser) return res.status(400).json({ success: false, message: "User is already exist" });

        // make password hassing
        const salt = await bcrypt.genSalt(10);
        const hassPass = await bcrypt.hash(password, salt);


        const newUser = new User({ name, email, password: hassPass });
        await newUser.save();


        // sign with jwt token
        const token = jwt.sign({ id :newUser._id, name: newUser.name, email:newUser.email},SECRETE_KEY,{ expiresIn : '1h'})
        res.status(200).json({ success: true, message: "User create successfully", user:{ name:newUser.name, email: newUser.email},token});

    } catch (error) {
        res.status(400).json({ success: false, message: "User create Faild", });
        console.error(error);
    }

})


// 02 : login user 

router.post('/login', async (req, res) => {

    try {

        // import in body 
        const { email, password } = req.body;


        // check input is filled or not 
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Fill all the input" });
        }

        // chack is email is exist or not 
        const existUser = await User.findOne({ email })
        if (!existUser) return res.status(400).json({ success: false, message: "UnAuthorised cradintial" });

        // compare hashing password
        const comparePass = await bcrypt.compare(password, existUser.password);
        if (!comparePass) return res.status(400).json({ success: false, message: "UnAuthorised cradintial" });

        res.status(200).json({ success: true, message: `WellCome Dear ${existUser.name}`, user: { name: existUser.name, email: existUser.email } });

    } catch (error) {
        res.status(400).json({ success: false, message: "Login faild"});
        console.error(error);
    }

})

// 03 : Delete users

router.post('/delete', async (req, res) => {
    try {

        // import in body 
        const { id } = req.body;

        const deleteUser = await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: `  Dear ${deleteUser.name} your account Deleted Successfully` });
    } catch (error) {
        res.status(400).json({ success: false, message: " Faild to delete", });
        console.error(error);
    }

})



export default router;