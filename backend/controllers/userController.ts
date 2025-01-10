import { Request, Response } from "express";

// Models
import User from "../models/User";

// Controllers

/** @description Create a New User */
export const createUser = async (req: Request, res: Response) => {
    const {name, email, dob} = req.body;

    
}

