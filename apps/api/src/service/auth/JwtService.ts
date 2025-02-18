import jwt from 'jsonwebtoken'

export class JwtService {
    private secrete : string = process.env.JWT_SEC || "default_secrete";

    generateToken(payload : any) : string | null{
        if(!payload) return null; 
        return jwt.sign(payload, this.secrete);
    }

    verifyToken(token : string) : any | null {
        if(!token) return null;

        try{
            return jwt.verify(token, this.secrete);
        }catch(error){
            throw Error((error as Error).message);
        }
    }
}