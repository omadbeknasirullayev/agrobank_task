import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/db";
import { Utilities } from "src/utils/utils";
import { Repository } from "typeorm";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private readonly utils: Utilities,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        // @InjectModel(Admin) private readonly adminRepository: typeof Admin, // MUST CHECK THIS
    ) { }
    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();

        const authHeader = req.headers.authorization;
        if (!authHeader) throw new UnauthorizedException('user Unauthorized');

        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if (bearer != 'Bearer' || !token) throw new UnauthorizedException('Admin Unauthorized');

        try {

            const data = await this.utils.verifyToken(token)
            const user: User = await this.userRepository.findOne({ where: { id: data.id } })

            if (!user) throw new UnauthorizedException('Invalid token provided');
            
            if (data.role == 'USER' || user.role != data.role) 
                throw new UnauthorizedException('Unauthorized user')
   
            req.user_id = user.id
            return true;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}