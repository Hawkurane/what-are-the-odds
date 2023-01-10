import { Module } from '@nestjs/common';
import { PathfinderModule as PathfinderAdapterModule } from '../infrastructure/secondary/pathfinder/pathfinder.module';
import { RoutesAdapterModule } from '../infrastructure/secondary/routes/routes.adapter.module';
import { OddsDomainService } from './service/odds.service';

@Module({
  imports: [RoutesAdapterModule, PathfinderAdapterModule],
  providers: [OddsDomainService],
  exports: [OddsDomainService],
})
export class DomainModule {}
