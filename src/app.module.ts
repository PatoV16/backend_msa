import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // Usuario por defecto en XAMPP
      password: '', // Deja vacío si no has configurado una contraseña
      database: 'gestio_academica_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Solo para desarrollo, en producción usa migraciones
    }),
  ],
})
export class AppModule {}
