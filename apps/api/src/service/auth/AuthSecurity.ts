import bcrypt from 'bcrypt';

export class AuthSecurity {
    private salt: number = 10;

    async createHashPassword(password: string): Promise<string> {
        try {
            return await bcrypt.hash(password, this.salt);
        } catch (error) {
            throw Error((error as Error).message);
        }
    }

    async verifyPassword(hashPassword: string, password: string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, hashPassword);
        } catch (error) {
            throw Error("Unable to Verify Password");
        }
    }

    verifyOtp(otp: number, userOtp: number) : boolean {
        if (otp == userOtp) {
            return true;
        }
        return false;
    }
}