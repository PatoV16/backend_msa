import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔓 Habilitar CORS para aceptar peticiones desde otros orígenes
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
