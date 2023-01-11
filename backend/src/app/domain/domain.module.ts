import { Module } from '@nestjs/common';
import { PathfinderModule } from '../infrastructure/secondary/pathfinder/pathfinder.module';
import { RoutesModule } from '../infrastructure/secondary/routes/routes.adapter.module';
import { OddsDomainService } from './service/odds.service';

@Module({
  imports: [RoutesModule, PathfinderModule],
  providers: [OddsDomainService],
  exports: [OddsDomainService],
})
export class DomainModule {}
