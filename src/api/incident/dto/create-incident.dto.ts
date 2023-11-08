import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNumber, IsString } from "class-validator"

export class CreateIncidentDto {
    @ApiProperty({ example: 'code solution', description: 'title of event' })
    @IsString()
    readonly title: string

    @ApiProperty({ example: "12-10-2023", description: 'start time of event' })
    // @IsDate()
    readonly start: Date

    @ApiProperty({ example: '12-10-2023', description: 'end time of event' })
    // @IsDate()
    readonly end: Date

    @IsNumber()
    readonly AddressLocation: number
}
