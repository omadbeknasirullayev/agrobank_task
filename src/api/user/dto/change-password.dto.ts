import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class ChangePassword {
    @ApiProperty({example: 'strong', description: 'new password of user'})
    @IsString()
    readonly newPassword: string
    
    @ApiProperty({example: 'very strong', description: 'old password of user'})
    @IsString()
    readonly oldPassword: string
}