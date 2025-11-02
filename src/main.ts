import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './core/http-exception.filter';
import { ErrorLogService } from './core/error-log.service';
//import { rawBodyMiddleware } from './middleware/xml-body.middleware';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  // Apply only for routes that need raw XML (like /xml-endpoint)
  //app.use('/xml-endpoint', rawBodyMiddleware);

  // Enable XML parsing
 

  app.use(cookieParser());

  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  });
  //app.useGlobalFilters(new HttpExceptionFilter());
  const errorLogService = app.get(ErrorLogService);
  const httpAdapterHost = app.get(HttpAdapterHost);

  // Create filter with injected service
  const filter = new AllExceptionsFilter(httpAdapterHost, errorLogService);
  app.useGlobalFilters(filter);

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

  await app.listen(process.env.PORT);
  console.log('runnig on http://localhost:' + process.env.PORT + '/api');  
}
bootstrap();
