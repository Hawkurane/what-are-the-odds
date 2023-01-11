import { Module } from '@nestjs/common';
import { Pathfinder } from 'src/app/domain/port/pathfinder.interface';
import { PathfinderAdapter } from './pathfinder.adapter';

@Module({
  imports: [],
  providers: [
    {
      provide: Pathfinder,
      useClass: PathfinderAdapter,
    },
  ],
  exports: [Pathfinder],
})
export class PathfinderModule {}
