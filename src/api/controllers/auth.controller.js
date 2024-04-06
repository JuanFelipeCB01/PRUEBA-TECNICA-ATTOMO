import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../../libs/jwt.js";
import res from "express/lib/response.js";

export const register = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const passHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passHash,
        })
    
        const savedUser = await newUser.save();
        const token = await createAccessToken({ id: savedUser.id });
        res.cookie('token', token );
        res.json({
            id: savedUser._id,
            user: savedUser.username,
            email: savedUser.email,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}

export const login = async (req, res) => {
    const { email, password} = req.body   

    try {
        const foundUser = await User.findOne({email})
        if (!foundUser)return res.status(400).json({message: "User and password missmatch"});

        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) return res.status(400).json({message: "User and password missmatch"});

        const token = await createAccessToken({ id: foundUser.id });

        res.cookie('token', token );
        res.json({
            id: foundUser._id,
            user: foundUser.username,
            email: foundUser.email,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const logout = (req, res) => {
    res.cookie('token', "");
    return res.sendStatus(200);
}

export const profile = async (req, res) =>{
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({ message: 'User not found'});
    
    return res.json({
        id: userFound._id,
        user: userFound.username,
        email: userFound.email,
    })
}