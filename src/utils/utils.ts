import { JwtService } from "@nestjs/jwt";
import { User } from "src/db";

export class Utils {
    constructor(private jwt: JwtService) { }
    
    async generateToken(data: User) {
        const payload = {
            id: data.id,
            role: data.role
        }
    }
}