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
            throw Error((error as Error).message)
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
            throw Error((error as Error).message);
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
            throw Error((err as Error).message);
        }
    }
    
}