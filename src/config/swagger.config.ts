import { DocumentBuilder } from "@nestjs/swagger";

export const SwaggerConfig = new DocumentBuilder()
    .setTitle('Agrobank test')
    .setDescription('REST API')
    .setVersion('1.0.0')
    .addTag('NodeJS, NestJS, PostgreSQL, TypeORM')
    .setDescription('Agrobank')
    .addBearerAuth(
        {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
        },
        'JWT-auth', 
    )
    .build();