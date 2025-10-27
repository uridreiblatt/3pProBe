import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('p3 Pro')
    .setDescription('The 3P API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log('runnig on http://localhost:' + port + '/api');
}
bootstrap();
