import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from './config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 6000

  app.useGlobalPipes(new ValidationPipe())

  // app.setGlobalPrefix('/api')
  const configSwagger = SwaggerConfig

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('/api/docs', app, document);

  
  await app.listen(port, () => {
    console.log(`server run on ${port}`);
    
  });
}
bootstrap();
