import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { User } from "src/db";

@Injectable()
export class Utilities {
    constructor(private jwt: JwtService) { }
    
    async generateToken(data: User) {
        const payload = {
            id: data.id,
            role: data.role
        }
        console.log(data);
        
        const token = await this.jwt.signAsync(payload, {
            secret: process.env.TOKEN_KEY,
            expiresIn: process.env.TOKEN_TIME
        })

        return token
    }

    async verifyToken(token: string) {
        const data = await this.jwt.verifyAsync(token, { secret: process.env.TOKEN_KEY })
        return data
    }

    async hashedPassword(password: string) {        
        return bcrypt.hashSync(password, 7)
    }

    async compairPassword(password: string, oldPassword: string) {
        return bcrypt.compareSync(password, oldPassword)
    } 
    
}