import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routes } from 'src/app/domain/port/routes.interface';
import { RouteEntity } from './entity/route.entity';
import { RoutesAdapter } from './routes.adapter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'universe.db',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([RouteEntity]),
  ],
  providers: [
    {
      provide: Routes,
      useClass: RoutesAdapter,
    },
  ],
  exports: [Routes],
})
export class RoutesAdapterModule {}
