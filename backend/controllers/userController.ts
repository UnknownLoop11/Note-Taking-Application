import { Request, Response } from "express";
import asyncHandler from "../lib/asyncHandler";

// Models
import User from "../models/User";

/** @description Get all users */
export const getUsers = asyncHandler(async (req: Request, res: Response) => {

    const users = await User.find();
    res.status(200).json(users);

})

/** @description Get a single user */
export const getUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {

    const {_id: userId} = req.body.user;

    const user = await User.findById(userId);

    if (!user) {
        res.status(404)
        .json({message: "User not found"});
        return
    }

    res.status(200).json({success: true, user});
})

/** @description Update a user */
export const updateUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {

    const {_id: userId} = req.body.user;

    const user = await User.findByIdAndUpdate(userId, {
        $set: req.body
    }, {new: true});
    
    res.status(200).json({success: true, user});
})

/** @description Delete a user */
export const deleteUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {

    const {_id: userId} = req.body.user;

    await User.deleteOne({_id: userId})


    res.status(200).json({success: true, message: "User deleted successfully"});

})


