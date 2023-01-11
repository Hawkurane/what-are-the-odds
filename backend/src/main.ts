import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  configureSwagger(app);

  await app.listen(3000);
}

function configureSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('What are the odds?')
    .setDescription(
      `The Death Star - the Empire's ultimate weapon - is almost operational and is currently approaching the Endor planet. The countdown has started. Han Solo, Chewbacca, Leia and C3PO are currently on Tatooine boarding on the Millennium Falcon. They must reach Endor to join the Rebel fleet and destroy the Death Star before it annihilates the planet. The Empire has hired the best bounty hunters in the galaxy to capture the Millennium Falcon and stop it from joining the rebel fleet...`,
    )
    .setVersion('1.0')
    .addTag('star wars')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
