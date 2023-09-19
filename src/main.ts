import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('code is here');
  console.log('log', process.env.POSTGRES_USERNAME);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
