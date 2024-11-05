import express, { json, request, response } from 'express'
import User from '../modal/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/register", async (request, response) => {
    try {
        const { full_name, email, password } = request.body;
        const user = await User.findOne({ email });

        if (user) {
            return response.status(400).json({ success: false, message: "email alrady exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            full_name,
            email,
            password:hashedPassword
        })

        await newUser.save();
        return response.status(200).json({ sucess: true, message: "Account is created sucessfully" });
    }catch (err) {
            return response.status(500), json({ sucess: false, message: "Error is adding user " })
        }
})  

router.post("/login", async (request, response) => {
    try {
        const {email, password } = request.body;
        const user = await User.findOne({ email });

        if (!user) {
            return response.status(401).json({ success: false, message: "user does not exixt" });
        }

        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return response
            .status(401)
            .json({ success: false, message: "User or password is incorrect"  });
        }

        // genrate token

        const secretKey = process.env.SECRET_KEY
        const token = jwt.sign(
            {id: user._id},
             secretKey,
            {expiresIn: "24h"}
        )

        return response
            .status(200)
            .json({ 
            success: true,
            token,
            user: {name: user.full_name}, 
            message: "Login successfully" 
        });


    }catch (err) {
            return response.status(500), json({ success: false, message: "Error is login " })
        }
})

export default router;