import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Tweety52',
      database: 'saas-empleadoia',
      autoLoadEntities: true,
      synchronize: true, // ⚠️ Solo en desarrollo
    }),
    ClientesModule,
  ],
})
export class AppModule {}