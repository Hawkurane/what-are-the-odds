import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as millenium_falcon from 'resources/millenium-falcon.json';
import { Routes } from 'src/app/domain/port/routes.interface';
import { RouteEntity } from './entity/route.entity';
import { RoutesAdapter } from './routes.adapter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: millenium_falcon.routes_db,
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
export class RoutesModule {}
