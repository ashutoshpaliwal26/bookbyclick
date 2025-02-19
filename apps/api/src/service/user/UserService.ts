import { Client } from '@repo/db/client'


export class UserService {
    public async createUser(name: string, email: string, password: string, code: number) {
        try {
            return await Client.user.create({
                data: {
                    name: name,
                    email: email,
                    password: password,
                    code: code
                }
            })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    public async checkUserByEmail(email: string): Promise<boolean> {
        const checkUser = await Client.user.findUnique({
            where: {
                email
            }
        });
        if (!checkUser) {
            return false;
        }
        return true;
    }

    public async findUserByEmail (email : string) : Promise<any | null> {
        try{
            const user = await Client.user.findUnique({
                where : {
                    email
                }
            })
            return user;
        }catch(error){
            throw new Error((error as Error).message);
        }
    }

    public async findUserById(id : number) : Promise <any | null> {
        try{
            const user = await Client.user.findUnique({
                where : {
                    id : id
                }
            });
            return user;
        }catch(err){
            throw new Error((err as Error).message);
        }
    }

    public async deleteUserById(id : number) : Promise<any | null> {
        try{
            return await Client.user.delete({
                where : {
                    id : id
                }
            });
        }catch(err){
            throw new Error((err as Error).message);
        }
    }

    public async getUserOtp(id : number) : Promise<number | null> {
        try{
            const user = await Client.user.findUnique({
                where : {
                    id : id
                }
            });

            if(!user){
                return null;
            }

            return user.code;
        }catch(err){
            throw new Error("")
        }
    }

    public async verifyUserById(id : number) : Promise<boolean> {
        try{
            const user = await Client.user.update({
                where : {id : id},
                data : {
                    isVerfied : true,
                    code : 0
                }
            })

            if(!user){
                return false;
            }
            
            return true;
        }catch(err){
            throw new Error("Verification Fail")
        }
    } 
}
