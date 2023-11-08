import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateAddressLocationDto {
    @ApiProperty({ example: 'street 15', description: 'AddressLocation name' })
    @IsString()
    readonly name: string

    @ApiProperty({ example: "String", description: 'AddressLocation' })
    @IsString()
    readonly location: string
}
