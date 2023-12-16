import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomExceptionFilter } from './lib/exceptions/custom-exception.filter';

async function bootstrap()
{
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new CustomExceptionFilter());
  const options = new DocumentBuilder()
    .setTitle('fun-o-gods')
    .setDescription('fun-o-gods API description')
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
