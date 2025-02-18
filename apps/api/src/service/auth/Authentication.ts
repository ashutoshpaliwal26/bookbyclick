import { generateOTP } from "../../utils/otpgenerator";
import { UserService } from "../user/UserService";
import { AuthSecurity } from "./AuthSecurity";
import { JwtService } from "./JwtService";

export class AuthSerivice {
    private jwtService: JwtService;
    private AuthSecurity: AuthSecurity;
    private UserService: UserService;


    constructor(jwtService: JwtService, authSecurity: AuthSecurity, userService: UserService) {
        this.jwtService = jwtService;
        this.AuthSecurity = authSecurity;
        this.UserService = userService;
    }

    public async signup(name: string, email: string, password: string): Promise<any | null> {
        const otpCode = generateOTP();
        const checkUser = await this.UserService.checkUserByEmail(email);

        if (checkUser) {
            return {
                status : 400,
                message : "User Already Exists"
            };
        }

        const hashPassword = await this.AuthSecurity.createHashPassword(password);

        const newUser = await this.UserService.createUser(name, email, hashPassword, parseInt(otpCode));

        const payload = {
            name: newUser.name,
            email: newUser.email,
            id: newUser.id
        }

        const token = this.jwtService.generateToken(payload);

        const responce = {
            status : 200,
            message: "User Created Successfully",
            token: token,
            data: payload
        }

        return responce;
    }

    public async login(email: string, password: string): Promise<any | null> {
        const checkUser = await this.UserService.checkUserByEmail(email);
        if (!checkUser) {
            const responce = {
                status : 400,
                message : "User Not Found You Need To Signup"
            }
            return responce;
        };
        const user = await this.UserService.findUserByEmail(email);
        const checkPassword = await this.AuthSecurity.verifyPassword(user.password as string, password);

        if(!checkPassword){
            const responce = {
                status : 404,
                message : "Incorrect Password"
            }
            return responce;
        }
        const payload = {
            name : user.name,
            email : user.email,
            id : user.id
        }
        const token = this.jwtService.generateToken(payload);
        
        const responce = {
            status : 200,
            message : "Login Successfully",
            data : payload,
            token
        }

        return responce;
    }

}