import { NextFunction, Request, Response } from "express";
import { JwtService } from "../service/auth/JwtService";
import { UserService } from "../service/user/UserService";

const jwtService = new JwtService();
const userService = new UserService();

const protectMiddileWare = async (req : Request, res : Response, next : NextFunction) : Promise<any> => {
    const header = req.headers.authorization;
    if(!header && !header?.startsWith("Berear ")) return res.status(400).json(
        {
            message : "Invalid Header."
        }
    )
    
    const token = header.split(" ")[1];

    const payload = jwtService.verifyToken(token as string);
    
    const user = await userService.findUserById(payload.id);

    if(!user){
        return res.status(400).json({
            message : "Invalid Token"
        })
    }

    next();
}

export default protectMiddileWare;