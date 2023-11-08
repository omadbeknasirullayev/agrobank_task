import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

export enum  Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

@Entity('users')
export class User {

    @ApiProperty({example: 1, description: 'UNICAL ID'})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 'Jhon Doe', description: 'fullname of user'})
    @Column({length: 64})
    fullname: string

    @ApiProperty({example: 'Jhon@gmail.com', description: 'email of user'})
    @Column({length: 128})
    email: string

    @ApiProperty({example: 'strong', description: 'password of user'})
    @Column()
    password: string

    @ApiProperty({example: 'ADMIN', description: 'role of user'})
    @Column({type: 'enum', enum: Role, default: Role.USER})
    role: Role

    @ApiProperty({example: true, description: 'user active or not'})
    @Column({default: true})
    is_active: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
    
}
