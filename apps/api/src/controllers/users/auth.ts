import { Request, Response } from "express";
import { AuthSerivice } from "../../service/auth/Authentication";
import { JwtService } from "../../service/auth/JwtService";
import { AuthSecurity } from "../../service/auth/AuthSecurity";
import { UserService } from "../../service/user/UserService";

const authService = new AuthSerivice(new JwtService, new AuthSecurity, new UserService);

export async function signUpUser(request: Request, responce: Response): Promise<any> {
    const { name, email, password } = request.body;
    if (!name || !email || !password) {
        return responce.status(400).json({
            message: "Fill all the fields"
        });
    }
    const signup = await authService.signup(name, email, password);
    return responce.status(signup.status as number).json(signup);
}

export async function logIn(request: Request, responce: Response): Promise<any> {
    const { email, password } = request.body;
    if (!email || !password) {
        return responce.status(400).json({
            message: "Fill all the fields"
        });
    }
    const login = await authService.login(email, password);
    return responce.status(login.status as number).json(login);
}