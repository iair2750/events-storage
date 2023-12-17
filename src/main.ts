import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { appConfig } from 'app/app-config/app-config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { validationFactory } from 'utils/exceptions/validation-factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, appConfig.getOptions());
  app.useGlobalPipes(
    new ValidationPipe({ stopAtFirstError: true, exceptionFactory: validationFactory })
  );

  const configSwagger = new DocumentBuilder()
    .setTitle('Mock my data')
    .setDescription('The mock API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  await app.listen(appConfig.getPort());
  console.log(`App listening on port ${appConfig.getPort()}`);
}
bootstrap();
