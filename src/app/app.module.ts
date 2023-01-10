import { Module } from '@nestjs/common';
import { OddsApplicationService } from './application/app.service';
import { DomainModule } from './domain/domain.module';
import { OddsController } from './infrastructure/primary/odds.controller';

@Module({
  imports: [DomainModule],
  controllers: [OddsController],
  providers: [OddsApplicationService],
})
export class AppModule {}
