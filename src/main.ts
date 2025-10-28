import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './core/http-exception.filter';
//import { rawBodyMiddleware } from './middleware/xml-body.middleware';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // Apply only for routes that need raw XML (like /xml-endpoint)
  //app.use('/xml-endpoint', rawBodyMiddleware);

  // Enable XML parsing

  app.use(cookieParser());

  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ['http://localhost:3010', 'http://127.0.0.1:3010'],
    credentials: true,
  });
  //app.useGlobalFilters(new HttpExceptionFilter());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle('P3 ')
    .setDescription('The p3 API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
    },
  });

  await app.listen(port);
  console.log('runnig on http://localhost:' + port + '/api');
  console.log(process.env.PORT);
}
bootstrap();
