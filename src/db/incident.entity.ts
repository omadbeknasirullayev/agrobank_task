import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { AddressLocation } from "./addressLocation.entity";

@Entity('Incident')
export class Incident {
    @ApiProperty({ example: 1, description: 'UNICAL ID' })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: 'code solution', description: 'title of event' })
    @Column()
    title: string

    @ApiProperty({ example: "12-10-2023", description: 'start time of event' })
    @Column()
    start: Date

    @ApiProperty({ example: 'gala consert', description: 'description of event' })
    @Column()
    description: string

    @ApiProperty({ example: '12-10-2023', description: 'end time of event' })
    @Column()
    end: Date

    @ManyToOne(() => AddressLocation, AddressLocation => AddressLocation.incident)
    addressLocation: AddressLocation

    @CreateDateColumn()
    createdAt: Timestamp

    @UpdateDateColumn()
    updatedAt: Timestamp
}
