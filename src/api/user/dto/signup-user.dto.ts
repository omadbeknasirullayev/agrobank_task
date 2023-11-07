import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class SignupUserDto {
    @ApiProperty({ example: 'Jhon Doe', description: 'fullname of user' })
    @IsString()
    readonly fullname: string

    @ApiProperty({ example: 'Jhon@gmail.com', description: 'email of user' })
    @IsEmail()
    readonly email: string

    @ApiProperty({ example: 'strong', description: 'password of user' })
    @IsString()
    readonly password: string
}
