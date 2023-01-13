import { Module } from '@nestjs/common';
import { OddsApplicationService } from './application/app.service';
import { DomainModule } from './domain/domain.module';
import { OddsCommand } from './infrastructure/primary/odds.command';
import { OddsController } from './infrastructure/primary/odds.controller';

@Module({
  imports: [DomainModule],
  controllers: [OddsController],
  providers: [OddsApplicationService, OddsCommand],
})
export class AppModule {}
