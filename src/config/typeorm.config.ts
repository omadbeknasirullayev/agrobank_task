import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TypeOrmConfig = async (): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + 'dist/**/*.entity{.ts, .js}'],
    autoLoadEntities: true,
    synchronize: true,
})