import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Incident } from "./incident.entity";

@Entity('AddressLocation')
export class AddressLocation {
    @ApiProperty({ example: 1, description: 'UNICAL ID' })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: 'street 15', description: 'AddressLocation name' })
    @Column()
    name: string

    @ApiProperty({ example: 'String', description: 'AddressLocation' })
    @Column()
    location: string

    @CreateDateColumn()
    createdAt: Timestamp

    @UpdateDateColumn()
    updatedAt: Timestamp

    @OneToMany(() => Incident, incident => incident.addressLocation)
    incident: Incident
}
