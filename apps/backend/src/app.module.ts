import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './clientes/clientes.module';
import { ProductosModule } from './productos/productos.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { AuthModule } from './auth/auth.module'; 
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DashboardModule } from './dashboard/dashboard.module';

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
    ProductosModule,
    PedidosModule,
    AuthModule,
    UsuariosModule,
    DashboardModule,
  ],
  /* providers: [
    {
      provide: APP_GUARD, // Usar el guardia globalmente
      useClass: JwtAuthGuard, // Aplica el guardia a todas las rutas
    },
  ], */
})
export class AppModule {}