import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { Producto } from '../productos/producto.entity';
import { Pedido } from '../pedidos/pedido.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, Pedido]),
    UsuariosModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
