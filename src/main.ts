import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',  // Cho phép tất cả các domain
    methods: 'GET,POST,PUT,DELETE',  // Các phương thức được phép
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
