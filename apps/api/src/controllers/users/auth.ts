import { Request, Response } from "express";
import { AuthSerivice } from "../../service/auth/Authentication";
import { JwtService } from "../../service/auth/JwtService";
import { AuthSecurity } from "../../service/auth/AuthSecurity";
import { UserService } from "../../service/user/UserService";

const authService = new AuthSerivice(new JwtService, new AuthSecurity, new UserService);

export async function signUpUser(request: Request, response: Response): Promise<any> {
    const { name, email, password } = request.body;
    if (!name || !email || !password) {
        return response.status(400).json({
            message: "Fill all the fields"
        });
    }
    const signup = await authService.signup(name, email, password);
    return response.status(signup.status as number).json(signup);
}

export async function logIn(request: Request, response: Response): Promise<any> {
    const { email, password } = request.body;
    if (!email || !password) {
        return response.status(400).json({
            message: "Fill all the fields"
        });
    }
    const login = await authService.login(email, password);
    return response.status(login.status as number).json(login);
}

export async function deleteUser(request: Request, response: Response): Promise<any> {
    const { userId } = request.params;

    if (!userId) {
        return response.status(400).json({
            message: "User Id is Not Given"
        })
    }

    await authService.deleteUser(parseInt(userId));

    return response.status(200).json({
        message : "User Deleted Successfully"
    })
}

export async function updateUser(request: Request, response: Response): Promise<any> {
    const { userId } = request.params;
    const { otp } = request.body;
    if (!userId) {
        return response.status(400).json({
            message: "Invalid URL"
        })
    }
    const isVerified = await authService.verifyUser(parseInt(userId), parseInt(otp))

    if(isVerified){
        return response.status(200).json({
            message : "Successfully Verified"
        });
    }

    return response.status(400).json({
        message : "Not Verified"
    })
}